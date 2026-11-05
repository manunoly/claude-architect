import assert from 'node:assert/strict';

type ProviderA = { provider: 'A'; unixSeconds: number; statusCode: number };
type ProviderB = { provider: 'B'; isoTime: string; status: string };
type ProviderInput = ProviderA | ProviderB;

function normalize(input: ProviderInput) {
  // The contract identifies seconds explicitly. Never guess the unit from magnitude.
  const time = input.provider === 'A'
    ? new Date(input.unixSeconds * 1000)
    : new Date(input.isoTime);
  if (!Number.isFinite(time.getTime())) throw new Error('Invalid provider time');
  const status = input.provider === 'A'
    ? ({ 1: 'open', 2: 'sealed' } as Record<number, string>)[input.statusCode] ?? 'unknown'
    : ({ OPEN: 'open', SEALED: 'sealed' } as Record<string, string>)[input.status] ?? 'unknown';
  return { time: time.toISOString(), status, source: input.provider, original: { ...input } };
}

function maximumQueueWait(slaHours: number, processingWindow: number, overhead: number) {
  if ([slaHours, processingWindow, overhead].some(x => !Number.isFinite(x) || x < 0)) {
    throw new Error('Hours must be finite and nonnegative');
  }
  const wait = slaHours - processingWindow - overhead;
  if (wait < 0) throw new Error('SLA is infeasible under these assumptions');
  return wait;
}

type BatchResult = { custom_id: string; state: 'success' | 'retryable' | 'needs_source'; value?: unknown };
function planRecovery(results: BatchResult[]) {
  // A missing source needs new evidence; resubmission alone cannot create it.
  return {
    preserve: results.filter(x => x.state === 'success').map(x => x.custom_id),
    retry: results.filter(x => x.state === 'retryable').map(x => x.custom_id),
    obtainSource: results.filter(x => x.state === 'needs_source').map(x => x.custom_id),
  };
}

const a = normalize({ provider: 'A', unixSeconds: 0, statusCode: 1 });
const b = normalize({ provider: 'B', isoTime: '1970-01-01T00:00:00Z', status: 'OPEN' });
assert.equal(a.time, b.time);
assert.equal(a.status, 'open');
assert.equal(a.source, 'A');
assert.equal(a.original.provider, 'A');
assert.equal(normalize({ provider: 'A', unixSeconds: 0, statusCode: 99 }).status, 'unknown');
assert.throws(() => normalize({ provider: 'B', isoTime: 'invalid', status: 'OPEN' }));
assert.equal(maximumQueueWait(29, 24, 0), 5);
assert.equal(maximumQueueWait(29, 24, .5), 4.5);
assert.throws(() => maximumQueueWait(29, Number.NaN, 0));
assert.throws(() => maximumQueueWait(23, 24, 0));
assert.deepEqual(planRecovery([
  { custom_id: 'doc-2', state: 'needs_source' },
  { custom_id: 'doc-1', state: 'success', value: 'kept' },
  { custom_id: 'doc-3', state: 'retryable' },
]), { preserve: ['doc-1'], retry: ['doc-3'], obtainSource: ['doc-2'] });
console.log('06-ejemplos-aplicados: normalización, SLA y recuperación comprobados');
export { normalize, maximumQueueWait, planRecovery };
