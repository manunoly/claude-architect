// PRÁCTICA 03 - TU VERSIÓN (punto de partida)
//
// Qué implementar: `normalizeOutcome` (qué resultado de herramienta se acepta y cuál no) y `run`
// (el bucle: cuándo seguir, cuándo parar y con qué estado). El modelo simulado `scripted` ya está
// hecho. Lee antes enunciado.md.
//
// Cómo ejecutarlo (desde la carpeta del proyecto):
//   node --experimental-strip-types practicas/03-bucle-agente/intento.ts
// Mientras haya funciones con TODO, el archivo falla: es lo esperado. Impleméntalas hasta que
// imprima "comprobaciones correctas; errores preservados y límites distintos de éxito".
//
// Las comprobaciones del final son una copia de las de solucion.ts; si cambian allí, actualízalas
// aquí. Abre solucion.ts solo después de intentarlo.
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

function normalizeOutcome(value: unknown): Outcome {
  // TODO: aceptar solo dos formas y tratar todo lo demás como error interno no reintentable.
  //  - éxito: objeto con ok === true y la clave `data` (aunque data sea [] o 0).
  //  - fallo: ok === false con category válida, retryable booleano y message texto; conserva
  //    esos campos tal cual (no conviertas un fallo en éxito ni cambies su categoría).
  //  - cualquier otra cosa: { ok: false, category: 'internal', retryable: false, message }.
  throw new Error('TODO: implementar normalizeOutcome (ver enunciado.md)');
}

async function run(model: Model, tool: Tool, limit = 4): Promise<State> {
  // TODO: el bucle de agente. Pista: enunciado.md, qué ocurre con tool_use y end_turn.
  //  - Historial inicial: un mensaje user con el encargo. Guarda cada turno del modelo completo
  //    como mensaje assistant, antes de actuar sobre él.
  //  - Decide por stop_reason, no por el texto ("Ya está" no termina nada):
  //      end_turn sin tool_use -> 'completed'; end_turn con tool_use -> 'incomplete'.
  //      otro motivo distinto de tool_use (p. ej. max_tokens) -> 'incomplete'.
  //  - tool_use sin llamadas o con ids repetidos -> 'incomplete' (no se pueden emparejar).
  //  - Si callsUsed + llamadas nuevas supera `limit`, para ANTES de ejecutar -> 'interrupted'.
  //  - Ejecuta las llamadas, normaliza cada resultado y responde con un mensaje user cuyo
  //    contenido son bloques tool_result (tool_use_id, is_error derivado de ok, content JSON).
  //  - Una excepción de la herramienta es un fallo imprevisto: tool_result con is_error true y
  //    categoría 'internal', retryable false. No la trates como transitoria.
  throw new Error('TODO: implementar run (ver enunciado.md)');
}

// Ya implementado: modelo simulado que entrega los turnos en orden y falla si se piden más.
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
