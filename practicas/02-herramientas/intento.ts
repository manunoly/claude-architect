// PRÁCTICA 02 - TU VERSIÓN (punto de partida)
//
// Qué implementar: `readMemory`, `searchMemory` y `providerUnavailable`. Son las decisiones de la
// práctica: qué se rechaza, con qué categoría y si el fallo es reintentable. `asMcp` y `asClaude`
// ya están hechos: solo convierten un resultado a dos formatos. Lee antes enunciado.md.
//
// Cómo ejecutarlo (desde la carpeta del proyecto):
//   node --experimental-strip-types practicas/02-herramientas/intento.ts
// Mientras haya funciones con TODO, el archivo falla: es lo esperado. Impleméntalas hasta que
// imprima "19 comprobaciones correctas".
//
// Las comprobaciones del final son una copia de las de solucion.ts; si cambian allí, actualízalas
// aquí. Abre solucion.ts solo después de intentarlo.
import assert from 'node:assert/strict';

type Memory = { id: string; owner: string; opensAt: string; body: string };
// category dice QUÉ pasó; retryable dice si volver a intentarlo puede cambiar el resultado.
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

function readMemory(identity: string, args: unknown): Outcome<Memory> {
  // TODO: devolver el recuerdo, o un Failure con la categoría correcta. Pista: enunciado.md.
  //  - `identity` lo pone la aplicación; los args del modelo solo pueden traer `id`.
  //  - args que no son un objeto, con claves extra (p. ej. owner) o sin id texto -> validation.
  //  - id inexistente o de otra persona -> permission, con el MISMO mensaje en ambos casos.
  //  - recuerdo propio con opensAt posterior a `now` (cápsula sellada) -> policy.
  //  - Ninguno de estos fallos es reintentable. Devuelve una copia del recuerdo, no el original.
  throw new Error('TODO: implementar readMemory (ver enunciado.md)');
}

function searchMemory(
  identity: string,
  term: string,
  providerAvailable = true,
): Outcome<{ id: string }[]> {
  // TODO: devolver los ids de los recuerdos propios, ya abiertos, cuyo body contenga `term`.
  //  - Sin coincidencias es un ÉXITO con lista vacía: { ok: true, data: [] }.
  //  - Si providerAvailable es false, devuelve el fallo transitorio; nunca una lista vacía,
  //    porque "no hay resultados" y "no pude buscar" no significan lo mismo para el coordinador.
  throw new Error('TODO: implementar searchMemory (ver enunciado.md)');
}

function providerUnavailable(): Failure {
  // TODO: el fallo transitorio del proveedor. Pista: ¿qué categoría y qué retryable le tocan?
  throw new Error('TODO: implementar providerUnavailable (ver enunciado.md)');
}

// Ya implementado: dos representaciones del MISMO resultado. Ambas derivan el indicador de error
// de `ok` y conservan la categoría dentro del contenido.
function asMcp(result: Outcome<unknown>) {
  return { isError: !result.ok, content: [{ type: 'text', text: JSON.stringify(result) }] };
}
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
