// PRÁCTICA 01 - TU VERSIÓN (punto de partida)
//
// Qué implementar: la función `validate` de abajo. Recibe el texto que devolvió el modelo y la
// fuente, y devuelve { ok: true, value } o { ok: false, errors }. Lee antes enunciado.md.
//
// Cómo ejecutarlo (desde la carpeta del proyecto):
//   node --experimental-strip-types practicas/01-extraccion/intento.ts
// Mientras `validate` lance el error TODO, el archivo falla: es lo esperado. Impleméntalo hasta
// que imprima "12 comprobaciones correctas".
//
// Las comprobaciones del final son una copia de las de solucion.ts; si cambian allí, actualízalas
// aquí. Abre solucion.ts solo después de intentarlo.
//
// Mensajes de error que esperan las comprobaciones (texto exacto):
//   syntax: invalid JSON
//   schema: missing <clave>          schema: unexpected <clave>
//   schema: invalid category         business: invalid calendar date
//   schema: title must be nonempty text   schema: detail must be text or null
//   business: other requires detail
//   evidence: sourceId does not match provided source
//   evidence: exact ISO date absent from this fixture source
import assert from 'node:assert/strict';

type Extraction = {
  title: string;
  date: string | null; // null = la fuente no trae fecha exacta; nunca se inventa
  category: 'family' | 'travel' | 'other' | 'unclear';
  detail: string | null;
  sourceId: string;
};
type Source = { id: string; text: string };
type Result = { ok: true; value: Extraction } | { ok: false; errors: string[] };

function validate(raw: string, source: Source): Result {
  // TODO: separar cuatro capas, de la más básica a la más profunda. Pista: enunciado.md.
  //  1. sintaxis: ¿es JSON? Si no lo es, no hay nada más que revisar.
  //  2. esquema: ¿es un objeto con exactamente las claves esperadas y valores del tipo correcto?
  //  3. negocio: ¿tiene sentido (other pide detail; la fecha existe en el calendario)?
  //  4. evidencia: ¿lo que afirma coincide con la fuente entregada (sourceId, fecha literal)?
  // Acumula los errores de esquema/negocio/evidencia en una lista para corregir de una vez.
  throw new Error('TODO: implementar validate (ver enunciado.md)');
}

// === COMPROBACIONES (copia exacta en intento.ts) ===
const source = { id: 'carta-1', text: 'Viajamos el 2004-08-12. Fue una visita familiar.' };
const valid = {
  title: 'Una visita',
  date: '2004-08-12',
  category: 'family',
  detail: null,
  sourceId: 'carta-1',
};

// Devuelve los errores de una entrada, o [] si es válida. Comprobar el mensaje exacto (y no solo
// ok:false) evita que una entrada falle por un motivo distinto del que se quería probar.
function errorsOf(input: object | string): string[] {
  const raw = typeof input === 'string' ? input : JSON.stringify(input);
  const result = validate(raw, source);
  return result.ok ? [] : result.errors;
}

assert.equal(validate(JSON.stringify(valid), source).ok, true);
assert.equal(validate(JSON.stringify({ ...valid, date: null }), source).ok, true);
assert.deepEqual(errorsOf({ ...valid, title: ' ' }), ['schema: title must be nonempty text']);
assert.deepEqual(errorsOf({ ...valid, detail: 5 }), ['schema: detail must be text or null']);
assert.deepEqual(errorsOf('{broken'), ['syntax: invalid JSON']);
assert.deepEqual(errorsOf({ ...valid, date: '2004-02-31' }), ['business: invalid calendar date']);
assert.deepEqual(errorsOf({ ...valid, date: '2005-08-12' }), [
  'evidence: exact ISO date absent from this fixture source',
]);
assert.deepEqual(errorsOf({ ...valid, category: 'other' }), ['business: other requires detail']);
assert.deepEqual(errorsOf({ ...valid, sourceId: 'otra-carta' }), [
  'evidence: sourceId does not match provided source',
]);
// Sin la clave date, la solución añade además un error de formato de fecha; se comprueba con
// includes para no depender de ese segundo mensaje.
const { date: _date, ...missing } = valid;
assert.ok(errorsOf(missing).includes('schema: missing date'));
assert.deepEqual(errorsOf({ ...valid, approved: true }), ['schema: unexpected approved']);
assert.deepEqual(errorsOf({ ...valid, category: ['family'] }), ['schema: invalid category']);
console.log('01-extraccion: 12 comprobaciones correctas');
// === FIN COMPROBACIONES ===

export { validate };
