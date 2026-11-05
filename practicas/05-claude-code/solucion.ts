import assert from 'node:assert/strict';
type Approval={releaseId:string;digest:string};
const trustedApprovals:Approval[]=[{releaseId:'r17',digest:'sha256:fixture-approved'}];
function preToolDecision(event:unknown){
 const deny=(reason:string)=>({hookSpecificOutput:{hookEventName:'PreToolUse',permissionDecision:'deny',permissionDecisionReason:reason}});
 if(typeof event!=='object'||event===null) return deny('Invalid event');
 const e=event as Record<string,unknown>;
 if(e.tool_name!=='mcp__release__deploy_release') return deny('Fixture only supports the dedicated deployment tool');
 if(typeof e.tool_input!=='object'||e.tool_input===null) return deny('Invalid tool input');
 const a=e.tool_input as Record<string,unknown>;
 if(Object.keys(a).some(k=>!['releaseId','digest'].includes(k))) return deny('Unexpected field');
 const approved=trustedApprovals.some(x=>x.releaseId===a.releaseId&&x.digest===a.digest);
 return approved?{hookSpecificOutput:{hookEventName:'PreToolUse',permissionDecision:'allow'}}:deny('No matching trusted approval');
}
const event={tool_name:'mcp__release__deploy_release',tool_input:{releaseId:'r17',digest:'sha256:fixture-approved'}};
assert.equal(preToolDecision(event).hookSpecificOutput.permissionDecision,'allow');
assert.equal(preToolDecision({...event,tool_input:{releaseId:'r18',digest:'sha256:fixture-approved'}}).hookSpecificOutput.permissionDecision,'deny');
assert.equal(preToolDecision({...event,tool_input:{releaseId:'r17',digest:'sha256:modified'}}).hookSpecificOutput.permissionDecision,'deny');
assert.equal(preToolDecision({...event,tool_input:{...event.tool_input,approved:true}}).hookSpecificOutput.permissionDecision,'deny');
assert.equal(preToolDecision({...event,tool_name:'unknown'}).hookSpecificOutput.permissionDecision,'deny');
assert.equal(preToolDecision(null).hookSpecificOutput.permissionDecision,'deny');
console.log('05-claude-code: 6 comprobaciones correctas; ejemplo no instalado como hook');
export {preToolDecision};
