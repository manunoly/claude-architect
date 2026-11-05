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

// Cada error lleva un prefijo (syntax / schema / business / evidence) para que quien reciba
// el fallo sepa QUÉ capa corregir: reescribir el JSON, ajustar la forma o revisar la fuente.
function validate(raw: string, source: Source): Result {
  // Capa 1, sintaxis: si no es JSON no hay nada más que comprobar, y devolver solo este error
  // evita una lista de fallos secundarios que no ayudan a corregir.
  let x: unknown;
  try {
    x = JSON.parse(raw);
  } catch {
    return { ok: false, errors: ['syntax: invalid JSON'] };
  }

  // JSON válido pero no un objeto (número, lista, null): no se puede revisar clave por clave.
  if (typeof x !== 'object' || x === null || Array.isArray(x)) {
    return { ok: false, errors: ['schema: object required'] };
  }
  const o = x as Record<string, unknown>;
  const errors: string[] = [];

  // Capa 2, esquema: se acumulan todos los errores de forma de una sola vez para que la
  // corrección sea de un intento, no de uno por error.
  const expected = ['title', 'date', 'category', 'detail', 'sourceId'];
  for (const key of expected) {
    // Object.hasOwn distingue "falta la clave" de "la clave vale null".
    if (!Object.hasOwn(o, key)) errors.push(`schema: missing ${key}`);
  }
  for (const key of Object.keys(o)) {
    // Un campo extra (p. ej. approved) no se ignora: el modelo no debe poder colar datos.
    if (!expected.includes(key)) errors.push(`schema: unexpected ${key}`);
  }
  if (typeof o.title !== 'string' || !o.title.trim()) {
    errors.push('schema: title must be nonempty text');
  }
  // typeof primero: includes() sobre un array como ['family'] daría un falso positivo.
  const categories = ['family', 'travel', 'other', 'unclear'];
  if (typeof o.category !== 'string' || !categories.includes(o.category)) {
    errors.push('schema: invalid category');
  }
  if (o.detail !== null && typeof o.detail !== 'string') {
    errors.push('schema: detail must be text or null');
  }

  // Capa 3, negocio: la forma es correcta pero la combinación no tiene sentido.
  if (o.category === 'other' && (typeof o.detail !== 'string' || !o.detail.trim())) {
    errors.push('business: other requires detail');
  }

  // Capa 4, evidencia: un objeto con la forma correcta aún puede afirmar algo falso.
  // Por eso se contrasta con la fuente que realmente se entregó.
  if (o.sourceId !== source.id) {
    errors.push('evidence: sourceId does not match provided source');
  }
  if (o.date !== null) {
    if (typeof o.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(o.date)) {
      errors.push('schema: date must be ISO date or null');
    } else {
      // El regex solo mira el formato; 2004-02-31 lo pasa. Se reconstruye la fecha y se compara
      // porque Date normaliza fechas imposibles (31 de febrero pasa a marzo) en vez de fallar.
      const parsed = new Date(o.date + 'T00:00:00Z');
      const sameDate =
        Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === o.date;
      if (!sameDate) {
        errors.push('business: invalid calendar date');
      } else if (!source.text.includes(o.date)) {
        // Fecha real del calendario, pero que la fuente no contiene: dato no sustentado.
        errors.push('evidence: exact ISO date absent from this fixture source');
      }
    }
  }

  return errors.length ? { ok: false, errors } : { ok: true, value: o as Extraction };
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
