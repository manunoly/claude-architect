import assert from 'node:assert/strict';

type Claim = {
  field: string;
  value: string;
  sourceId: string; // cada afirmación lleva su fuente: sin procedencia no se puede revalidar
  eventDate: string; // cuándo ocurrió el hecho
  publishedAt: string; // cuándo lo publicó la fuente; son fechas distintas a propósito
};
type Saved = {
  objective: string;
  facts: Record<string, string>;
  claims: Claim[];
  pending: string[];
  errors: { sourceId: string; category: string }[];
};

// Reconstruye el contexto a partir del estado guardado y de los permisos de AHORA.
// Una autorización antigua no basta: la fuente pudo perder acceso desde que se guardó el estado.
function buildContext(saved: Saved, currentlyAllowed: Set<string>) {
  const claims = saved.claims.filter((c) => currentlyAllowed.has(c.sourceId));

  // Valores distintos para el mismo campo son un CANDIDATO a conflicto, no una contradicción
  // probada (pueden referirse a periodos distintos). Se conservan los dos, no se elige uno.
  const fields = [...new Set(claims.map((c) => c.field))];
  const conflicts = fields.filter((f) => {
    const values = claims.filter((c) => c.field === f).map((c) => c.value);
    return new Set(values).size > 1;
  });

  // Las fuentes excluidas no desaparecen en silencio: quedan como trabajo pendiente de
  // revalidar. Así el contexto no presenta como terminado algo que solo se descartó.
  const excluded = saved.claims
    .filter((c) => !currentlyAllowed.has(c.sourceId))
    .map((c) => c.sourceId);

  // Se devuelven copias de facts, pending y errors para no modificar el estado guardado.
  return {
    objective: saved.objective,
    facts: { ...saved.facts },
    claims,
    conflicts,
    pending: [...saved.pending, ...excluded.map((id) => `revalidate excluded source ${id}`)],
    errors: [...saved.errors],
  };
}

type Labeled = { kind: string; field: string; confidence: number; correct: boolean };

// Error por tipo de documento Y campo, no un promedio global: un 95% medio puede esconder un
// campo (p. ej. fechas de cartas) que falla siempre.
function errorBySegment(rows: Labeled[]) {
  const out: Record<string, { total: number; errors: number; errorRate: number }> = {};
  for (const row of rows) {
    const key = row.kind + ':' + row.field;
    const s = out[key] ?? { total: 0, errors: 0, errorRate: 0 };
    s.total++;
    if (!row.correct) s.errors++;
    s.errorRate = s.errors / s.total;
    out[key] = s;
  }
  return out;
}

// Muestra de revisión: un elemento por segmento, solo de los de alta confianza. Es donde un
// error cuesta más porque nadie lo revisaría; "confianza alta" no equivale a "correcto".
// El generador congruencial con semilla hace la muestra reproducible entre ejecuciones.
function sampleHighConfidence(rows: Labeled[], seed = 7) {
  const groups = new Map<string, Labeled[]>();
  for (const row of rows.filter((x) => x.confidence >= 0.9)) {
    const key = row.kind + ':' + row.field;
    groups.set(key, [...(groups.get(key) ?? []), row]);
  }
  return [...groups.entries()].map(([stratum, items]) => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return { stratum, item: items[seed % items.length] };
  });
}

const saved: Saved = {
  objective: 'Prepare an evidence-backed draft',
  facts: { caseId: 'case-7' },
  claims: [
    {
      field: 'year',
      value: '2003',
      sourceId: 's1',
      eventDate: '2003-06-01',
      publishedAt: '2020-01-01',
    },
    {
      field: 'year',
      value: '2004',
      sourceId: 's2',
      eventDate: '2004-06-01',
      publishedAt: '2021-01-01',
    },
    {
      field: 'private',
      value: 'do not include',
      sourceId: 'restricted',
      eventDate: '2005-01-01',
      publishedAt: '2022-01-01',
    },
  ],
  pending: ['Ask about conflicting dates'],
  errors: [{ sourceId: 's3', category: 'transient' }],
};
const context = buildContext(saved, new Set(['s1', 's2']));
assert.equal(context.facts.caseId, 'case-7');
assert.deepEqual(context.conflicts, ['year']);
assert.equal(context.claims.length, 2);
assert.equal(context.pending.length, 2);
assert.equal(context.errors[0].category, 'transient');
assert.equal(saved.claims.length, 3); // el estado guardado no se modificó

const labeled: Labeled[] = [
  { kind: 'typed', field: 'date', confidence: 0.95, correct: true },
  { kind: 'typed', field: 'date', confidence: 0.96, correct: true },
  { kind: 'letter', field: 'date', confidence: 0.95, correct: false },
  { kind: 'letter', field: 'date', confidence: 0.94, correct: false },
  { kind: 'letter', field: 'title', confidence: 0.8, correct: true },
];
const rates = errorBySegment(labeled);
assert.equal(rates['typed:date'].errorRate, 0);
assert.equal(rates['letter:date'].errorRate, 1);
const strata = sampleHighConfidence(labeled).map((x) => x.stratum).sort();
assert.deepEqual(strata, ['letter:date', 'typed:date']);
assert.deepEqual(sampleHighConfidence(labeled, 7), sampleHighConfidence(labeled, 7));
console.log('04-contexto: 10 comprobaciones correctas');

export { buildContext, errorBySegment, sampleHighConfidence };
