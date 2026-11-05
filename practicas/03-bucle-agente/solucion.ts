import assert from 'node:assert/strict';

// La API de Claude exige que `input` de un tool_use sea un objeto, no un texto suelto.
type Call = { type: 'tool_use'; id: string; name: string; input: Record<string, unknown> };
type Block = Call | { type: 'text'; text: string };
type Turn = { stop_reason: string; content: Block[] };
type Message = { role: 'user' | 'assistant'; content: unknown };
// Tres estados de salida: un límite o un corte NUNCA se reporta como 'completed'.
type State = {
  status: 'completed' | 'interrupted' | 'incomplete';
  history: Message[];
  callsUsed: number;
  reason: string;
};
type Model = (history: Message[]) => Promise<Turn>;
type Tool = (name: string, input: Record<string, unknown>) => Promise<unknown>;
type Category = 'transient' | 'validation' | 'permission' | 'policy' | 'internal';
type Outcome =
  | { ok: true; data: unknown }
  | { ok: false; category: Category; retryable: boolean; message: string };

// Las herramientas son código ajeno al bucle y pueden devolver cualquier cosa. Se exige una
// forma exacta; lo que no encaje se trata como error interno, nunca como éxito, porque aceptar
// una forma desconocida podría convertir un fallo real en un resultado "bueno".
function normalizeOutcome(value: unknown): Outcome {
  const invalid: Outcome = {
    ok: false,
    category: 'internal',
    retryable: false,
    message: 'Invalid internal tool outcome',
  };
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return invalid;
  const o = value as Record<string, unknown>;

  // data puede ser [] o 0 (valores "falsos" pero válidos), por eso se mira la clave y no su valor.
  if (o.ok === true && Object.hasOwn(o, 'data')) return { ok: true, data: o.data };

  const categories: Category[] = ['transient', 'validation', 'permission', 'policy', 'internal'];
  if (
    o.ok === false &&
    typeof o.category === 'string' &&
    categories.includes(o.category as Category) &&
    typeof o.retryable === 'boolean' &&
    typeof o.message === 'string'
  ) {
    // Se copian los campos uno a uno: así no pasa al historial nada que el modelo no deba ver.
    return {
      ok: false,
      category: o.category as Category,
      retryable: o.retryable,
      message: o.message,
    };
  }
  return invalid;
}

async function run(model: Model, tool: Tool, limit = 4): Promise<State> {
  const history: Message[] = [
    { role: 'user', content: 'Read the authorized fixture sources and prepare a draft.' },
  ];
  let callsUsed = 0;

  while (true) {
    const turn = await model(history);
    // Se guarda el turno completo (texto y tool_use) para que cada resultado pueda enlazarse
    // después con su llamada por id.
    history.push({ role: 'assistant', content: turn.content });
    const calls = turn.content.filter((b): b is Call => b.type === 'tool_use');

    // La decisión se toma por stop_reason, no por lo que diga el texto: una frase como "ya está"
    // puede aparecer en un turno que todavía pide herramientas.
    if (turn.stop_reason === 'end_turn') {
      // end_turn con tool_use pendientes contradice el protocolo: no es un éxito.
      return {
        status: calls.length ? 'incomplete' : 'completed',
        history,
        callsUsed,
        reason: calls.length ? 'inconsistent protocol' : 'normal end_turn',
      };
    }
    // max_tokens, pause_turn u otro motivo: la respuesta no terminó, no se da por buena.
    if (turn.stop_reason !== 'tool_use') {
      return { status: 'incomplete', history, callsUsed, reason: turn.stop_reason };
    }
    // Sin llamadas, o con ids repetidos, no se pueden emparejar los resultados con su llamada.
    if (calls.length === 0 || new Set(calls.map((c) => c.id)).size !== calls.length) {
      return { status: 'incomplete', history, callsUsed, reason: 'invalid tool call set' };
    }
    // El límite se comprueba ANTES de ejecutar: no se hacen llamadas por encima del presupuesto
    // y las pendientes quedan en el historial. Es 'interrupted', no 'completed'.
    if (callsUsed + calls.length > limit) {
      return {
        status: 'interrupted',
        history,
        callsUsed,
        reason: 'tool budget reached; pending calls preserved in history',
      };
    }

    // Suposición del fixture: lecturas independientes, por eso pueden ir en paralelo.
    // Con dependencias o efectos haría falta un planificador que las ordene.
    const results = await Promise.all(
      calls.map(async (c) => {
        try {
          const outcome = normalizeOutcome(await tool(c.name, c.input));
          return {
            type: 'tool_result',
            tool_use_id: c.id,
            is_error: !outcome.ok,
            content: JSON.stringify(outcome),
          };
        } catch (e) {
          // Una excepción es un fallo imprevisto (probable bug), no un fallo conocido del
          // proveedor: se marca interno y no reintentable. Los fallos transitorios llegan
          // como resultado estructurado, no como excepción.
          return {
            type: 'tool_result',
            tool_use_id: c.id,
            is_error: true,
            content: JSON.stringify({
              ok: false,
              category: 'internal',
              retryable: false,
              message: String(e),
            }),
          };
        }
      }),
    );
    callsUsed += calls.length;
    history.push({ role: 'user', content: results });
  }
}

// Modelo simulado: entrega los turnos en orden y falla si se piden más de los guionizados.
// Así la prueba no depende de ninguna API y un bucle infinito se detecta enseguida.
function scripted(turns: Turn[]): Model {
  let i = 0;
  return async () => {
    if (i >= turns.length) throw Error('Fixture exhausted');
    return turns[i++];
  };
}

// === COMPROBACIONES (copia exacta en intento.ts) ===
const calls: Turn = {
  stop_reason: 'tool_use',
  content: [
    { type: 'text', text: 'Ya está. Voy a consultar.' },
    { type: 'tool_use', id: 'a', name: 'read', input: { sourceId: 'one' } },
    { type: 'tool_use', id: 'b', name: 'read', input: { sourceId: 'two' } },
  ],
};
const end: Turn = {
  stop_reason: 'end_turn',
  content: [{ type: 'text', text: 'Draft with evidence.' }],
};
const noop: Tool = async () => ({});

// El historial queda [user, assistant, user con los resultados, ...]: los resultados están en [2].
type ToolResult = { tool_use_id: string; is_error: boolean; content: string };
const resultsOf = (state: State) => state.history[2].content as ToolResult[];

const completed = await run(scripted([calls, end]), async (_, x) => ({
  ok: true,
  data: { source: x },
}));
assert.equal(completed.status, 'completed');
assert.equal(completed.callsUsed, 2);
assert.deepEqual(resultsOf(completed).map((x) => x.tool_use_id), ['a', 'b']);
assert.equal(completed.history[1].role, 'assistant');
const overBudget = await run(scripted([calls]), noop, 1);
assert.equal(overBudget.status, 'interrupted');
// Se detiene antes de ejecutar: el presupuesto no se gasta en llamadas que no caben.
assert.equal(overBudget.callsUsed, 0);
const maxTokens: Turn = { stop_reason: 'max_tokens', content: [] };
assert.equal((await run(scripted([maxTokens]), noop)).status, 'incomplete');
const emptyToolUse: Turn = { stop_reason: 'tool_use', content: [] };
assert.equal((await run(scripted([emptyToolUse]), noop)).status, 'incomplete');
const duplicated: Turn = { stop_reason: 'tool_use', content: [calls.content[1], calls.content[1]] };
assert.equal((await run(scripted([duplicated]), noop)).status, 'incomplete');
const crashed = await run(scripted([calls, end]), async () => {
  throw Error('tool crashed');
});
assert.equal(resultsOf(crashed).every((x) => x.is_error), true);
const endWithCalls: Turn = { stop_reason: 'end_turn', content: calls.content };
assert.equal((await run(scripted([endWithCalls]), noop)).status, 'incomplete');
const permission = await run(scripted([calls, end]), async () => ({
  ok: false,
  category: 'permission',
  retryable: false,
  message: 'Denied',
}));
const permissionResult = resultsOf(permission)[0];
assert.equal(permissionResult.is_error, true);
assert.equal(JSON.parse(permissionResult.content).category, 'permission');
assert.equal(JSON.parse(permissionResult.content).retryable, false);
// Un fallo transitorio ESTRUCTURADO conserva retryable:true, a diferencia de una excepción.
const transient = await run(scripted([calls, end]), async () => ({
  ok: false,
  category: 'transient',
  retryable: true,
  message: 'Source temporarily unavailable',
}));
const transientResult = resultsOf(transient)[0];
assert.equal(transientResult.is_error, true);
assert.equal(JSON.parse(transientResult.content).category, 'transient');
assert.equal(JSON.parse(transientResult.content).retryable, true);
const unexpected = await run(scripted([calls, end]), async () => {
  throw new TypeError('unexpected bug');
});
const unexpectedResult = JSON.parse(resultsOf(unexpected)[0].content);
assert.equal(unexpectedResult.category, 'internal');
assert.equal(unexpectedResult.retryable, false);
assert.equal(normalizeOutcome({ unknown: 'shape' }).ok, false);
assert.deepEqual(normalizeOutcome({ ok: true, data: [] }), { ok: true, data: [] });
console.log(
  '03-bucle-agente: comprobaciones correctas; errores preservados y límites distintos de éxito',
);
// === FIN COMPROBACIONES ===

export { run };
