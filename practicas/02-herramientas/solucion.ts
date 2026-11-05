import assert from 'node:assert/strict';

type Memory = { id: string; owner: string; opensAt: string; body: string };
// category dice QUÉ pasó; retryable dice si volver a intentarlo puede cambiar el resultado.
// Solo 'transient' es reintentable: los demás fallos darían la misma respuesta otra vez.
type Failure = {
  ok: false;
  category: 'validation' | 'permission' | 'policy' | 'transient';
  retryable: boolean;
  message: string;
};
type Outcome<T> = { ok: true; data: T } | Failure;

// "Ahora" fijo: con el reloj real las pruebas dejarían de ser deterministas.
const now = Date.parse('2026-11-05T12:00:00Z');
const rows: Memory[] = [
  { id: 'm1', owner: 'u1', opensAt: '2020-01-01T00:00:00Z', body: 'Una visita al mar' },
  { id: 'm2', owner: 'u1', opensAt: '2030-01-01T00:00:00Z', body: 'Contenido sellado' },
  {
    id: 'm3',
    owner: 'u2',
    opensAt: '2020-01-01T00:00:00Z',
    body: 'Recuerdo privado de otra persona',
  },
];

// `identity` lo pone la aplicación, no el modelo: si el modelo pudiera enviar un owner, bastaría
// con pedirlo para leer recuerdos ajenos. Por eso cualquier argumento distinto de id se rechaza.
function readMemory(identity: string, args: unknown): Outcome<Memory> {
  if (typeof args !== 'object' || args === null || Array.isArray(args)) {
    return { ok: false, category: 'validation', retryable: false, message: 'Object required' };
  }
  const a = args as Record<string, unknown>;
  if (Object.keys(a).some((k) => k !== 'id') || typeof a.id !== 'string') {
    return {
      ok: false,
      category: 'validation',
      retryable: false,
      message: 'Only memory id is accepted',
    };
  }

  // "No existe" y "es de otra persona" dan el MISMO error a propósito: si se distinguieran,
  // el modelo podría descubrir qué ids existen aunque no pueda leerlos.
  const row = rows.find((x) => x.id === a.id);
  if (!row || row.owner !== identity) {
    return {
      ok: false,
      category: 'permission',
      retryable: false,
      message: 'Resource unavailable for this identity',
    };
  }

  // Cápsula propia pero aún cerrada: es una política, no un fallo, y esperar no cambia nada
  // dentro de esta llamada, así que no es reintentable.
  if (Date.parse(row.opensAt) > now) {
    return { ok: false, category: 'policy', retryable: false, message: 'Capsule is not open' };
  }
  // Se devuelve una copia para que quien llama no pueda modificar el fixture compartido.
  return { ok: true, data: { ...row } };
}

// `providerAvailable` simula si la fuente de datos responde. Se inyecta como parámetro (en vez
// de un interruptor global) para que el fallo transitorio sea alcanzable desde una prueba.
function searchMemory(
  identity: string,
  term: string,
  providerAvailable = true,
): Outcome<{ id: string }[]> {
  // Proveedor caído: nunca devolver una lista vacía. Un [] significaría "no hay coincidencias"
  // y el coordinador dejaría de buscar en vez de reintentar.
  if (!providerAvailable) return providerUnavailable();

  // El filtro de propiedad y de fecha va en la búsqueda misma: un recuerdo sellado no debe
  // filtrarse como id solo porque el término coincida con su texto.
  const matches = rows
    .filter((x) => x.owner === identity)
    .filter((x) => Date.parse(x.opensAt) <= now)
    .filter((x) => x.body.includes(term))
    .map((x) => ({ id: x.id }));
  return { ok: true, data: matches };
}

function providerUnavailable(): Failure {
  return {
    ok: false,
    category: 'transient',
    retryable: true,
    message: 'Source temporarily unavailable',
  };
}

// Dos representaciones del MISMO resultado. Ambas derivan el indicador de error de `ok` para que
// un fallo nunca viaje como éxito, y ambas conservan la categoría dentro del contenido.
function asMcp(result: Outcome<unknown>) {
  return { isError: !result.ok, content: [{ type: 'text', text: JSON.stringify(result) }] };
}
// La API de Claude exige tool_use_id: es lo que enlaza el resultado con la llamada concreta.
function asClaude(toolUseId: string, result: Outcome<unknown>) {
  return {
    type: 'tool_result',
    tool_use_id: toolUseId,
    is_error: !result.ok,
    content: JSON.stringify(result),
  };
}

// === COMPROBACIONES (copia exacta en intento.ts) ===
// Comprueba que es un fallo y lo devuelve, para poder inspeccionar su categoría.
function failure(outcome: Outcome<unknown>): Failure {
  assert.equal(outcome.ok, false);
  return outcome as Failure;
}

assert.equal(readMemory('u1', { id: 'm1' }).ok, true);
assert.equal(failure(readMemory('u1', { id: 'm2' })).category, 'policy');
assert.equal(failure(readMemory('u1', { id: 'm3' })).category, 'permission');
assert.equal(failure(readMemory('u1', { id: 'm3', owner: 'u2' })).category, 'validation');
// Ninguno de estos fallos se resuelve repitiendo la llamada.
assert.equal(failure(readMemory('u1', { id: 'm2' })).retryable, false);
assert.equal(failure(readMemory('u1', { id: 'm3' })).retryable, false);
assert.equal(failure(readMemory('u1', { id: 'm3', owner: 'u2' })).retryable, false);
// Un id inexistente y uno ajeno dan el mismo error: no se revela qué ids existen.
assert.deepEqual(readMemory('u1', { id: 'm99' }), readMemory('u1', { id: 'm3' }));
assert.deepEqual(searchMemory('u1', 'no existe'), { ok: true, data: [] });
assert.deepEqual(searchMemory('u1', 'mar'), { ok: true, data: [{ id: 'm1' }] });
assert.deepEqual(searchMemory('u1', 'Contenido'), { ok: true, data: [] });
// El recuerdo privado de otra persona no aparece en tus búsquedas.
assert.deepEqual(searchMemory('u1', 'privado'), { ok: true, data: [] });
const providerDown = failure(searchMemory('u1', 'mar', false));
assert.equal(providerDown.category, 'transient');
assert.equal(providerDown.retryable, true);
assert.equal(providerUnavailable().ok, false);
assert.equal(providerUnavailable().retryable, true);
const denied = readMemory('u1', { id: 'm2' });
assert.equal(asMcp(denied).isError, true);
assert.equal(asClaude('call-9', denied).tool_use_id, 'call-9');
assert.equal(asClaude('call-9', denied).is_error, true);
console.log('02-herramientas: 19 comprobaciones correctas');
// === FIN COMPROBACIONES ===

export { readMemory, searchMemory, asMcp, asClaude };
