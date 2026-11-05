import assert from 'node:assert/strict';

type Approval = { releaseId: string; digest: string };

// Registro confiable escrito por personas, fuera del alcance del modelo. Si la aprobación
// viniera en los argumentos de la llamada, el modelo podría auto-aprobarse.
const trustedApprovals: Approval[] = [{ releaseId: 'r17', digest: 'sha256:fixture-approved' }];

// Simula un hook PreToolUse: decide ANTES del efecto, de forma determinista, sin pedir opinión
// al modelo. Ante cualquier entrada inesperada se deniega (fail closed) en lugar de permitir
// por defecto: un despliegue indebido no se deshace con un mensaje de error posterior.
function preToolDecision(event: unknown) {
  const deny = (reason: string) => ({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason: reason,
    },
  });
  if (typeof event !== 'object' || event === null) return deny('Invalid event');
  const e = event as Record<string, unknown>;

  // Solo se reconoce la herramienta dedicada. Una herramienta desconocida se deniega en lugar
  // de permitirse por defecto, porque este fixture no sabe qué efectos tendría.
  if (e.tool_name !== 'mcp__release__deploy_release') {
    return deny('Fixture only supports the dedicated deployment tool');
  }
  if (typeof e.tool_input !== 'object' || e.tool_input === null) return deny('Invalid tool input');
  const a = e.tool_input as Record<string, unknown>;

  // Un campo extra como approved:true se rechaza: no puede sustituir a la aprobación del registro.
  if (Object.keys(a).some((k) => !['releaseId', 'digest'].includes(k))) {
    return deny('Unexpected field');
  }

  // Se exigen releaseId Y digest exactos. Con solo el id, alguien podría cambiar el contenido
  // de la versión después de ser aprobada y seguir pasando.
  const approved = trustedApprovals.some(
    (x) => x.releaseId === a.releaseId && x.digest === a.digest,
  );
  if (!approved) return deny('No matching trusted approval');
  return { hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'allow' } };
}

const event = {
  tool_name: 'mcp__release__deploy_release',
  tool_input: { releaseId: 'r17', digest: 'sha256:fixture-approved' },
};
const decisionOf = (e: unknown) => preToolDecision(e).hookSpecificOutput.permissionDecision;

assert.equal(decisionOf(event), 'allow');
assert.equal(
  decisionOf({ ...event, tool_input: { releaseId: 'r18', digest: 'sha256:fixture-approved' } }),
  'deny',
);
assert.equal(
  decisionOf({ ...event, tool_input: { releaseId: 'r17', digest: 'sha256:modified' } }),
  'deny',
);
assert.equal(decisionOf({ ...event, tool_input: { ...event.tool_input, approved: true } }), 'deny');
assert.equal(decisionOf({ ...event, tool_name: 'unknown' }), 'deny');
assert.equal(decisionOf(null), 'deny');
console.log('05-claude-code: 6 comprobaciones correctas; ejemplo no instalado como hook');

export { preToolDecision };
