import assert from 'node:assert/strict';
type Call={type:'tool_use';id:string;name:string;input:unknown};
type Block=Call|{type:'text';text:string};
type Turn={stop_reason:string;content:Block[]};
type Message={role:'user'|'assistant';content:unknown};
type State={status:'completed'|'interrupted'|'incomplete';history:Message[];callsUsed:number;reason:string};
type Model=(history:Message[])=>Promise<Turn>;
type Tool=(name:string,input:unknown)=>Promise<unknown>;
type Category='transient'|'validation'|'permission'|'policy'|'internal';
type Outcome={ok:true;data:unknown}|{ok:false;category:Category;retryable:boolean;message:string};
function normalizeOutcome(value:unknown):Outcome{
 const invalid:Outcome={ok:false,category:'internal',retryable:false,message:'Invalid internal tool outcome'};
 if(typeof value!=='object'||value===null||Array.isArray(value))return invalid;
 const o=value as Record<string,unknown>;
 if(o.ok===true&&Object.hasOwn(o,'data'))return {ok:true,data:o.data};
 const categories:Category[]=['transient','validation','permission','policy','internal'];
 if(o.ok===false&&typeof o.category==='string'&&categories.includes(o.category as Category)&&typeof o.retryable==='boolean'&&typeof o.message==='string'){
  return {ok:false,category:o.category as Category,retryable:o.retryable,message:o.message};
 }
 return invalid;
}
async function run(model:Model,tool:Tool,limit=4):Promise<State>{
 const history:Message[]=[{role:'user',content:'Read the authorized fixture sources and prepare a draft.'}];let callsUsed=0;
 while(true){
  const turn=await model(history);history.push({role:'assistant',content:turn.content});
  const calls=turn.content.filter((b):b is Call=>b.type==='tool_use');
  if(turn.stop_reason==='end_turn') return {status:calls.length?'incomplete':'completed',history,callsUsed,reason:calls.length?'inconsistent protocol':'normal end_turn'};
  if(turn.stop_reason!=='tool_use') return {status:'incomplete',history,callsUsed,reason:turn.stop_reason};
  if(calls.length===0||new Set(calls.map(c=>c.id)).size!==calls.length) return {status:'incomplete',history,callsUsed,reason:'invalid tool call set'};
  if(callsUsed+calls.length>limit) return {status:'interrupted',history,callsUsed,reason:'tool budget reached; pending calls preserved in history'};
  // Fixture assumption: independent read-only calls. Effects/dependencies require another scheduler.
  const results=await Promise.all(calls.map(async c=>{
   try{const outcome=normalizeOutcome(await tool(c.name,c.input));return {type:'tool_result',tool_use_id:c.id,is_error:!outcome.ok,content:JSON.stringify(outcome)};}
   catch(e){return {type:'tool_result',tool_use_id:c.id,is_error:true,content:JSON.stringify({ok:false,category:'internal',retryable:false,message:String(e)})};}
  }));
  callsUsed+=calls.length;history.push({role:'user',content:results});
 }
}
function scripted(turns:Turn[]):Model{let i=0;return async()=>{if(i>=turns.length)throw Error('Fixture exhausted');return turns[i++];};}
const calls:Turn={stop_reason:'tool_use',content:[{type:'text',text:'Ya está. Voy a consultar.'},{type:'tool_use',id:'a',name:'read',input:'one'},{type:'tool_use',id:'b',name:'read',input:'two'}]};
const end:Turn={stop_reason:'end_turn',content:[{type:'text',text:'Draft with evidence.'}]};
const completed=await run(scripted([calls,end]),async(_,x)=>({ok:true,data:{source:x}}));
assert.equal(completed.status,'completed');assert.equal(completed.callsUsed,2);
const results=completed.history[2].content as {tool_use_id:string}[];
assert.deepEqual(results.map(x=>x.tool_use_id),['a','b']);
assert.equal(completed.history[1].role,'assistant');
assert.equal((await run(scripted([calls]),async()=>({}),1)).status,'interrupted');
assert.equal((await run(scripted([{stop_reason:'max_tokens',content:[]}]),async()=>({}))).status,'incomplete');
assert.equal((await run(scripted([{stop_reason:'tool_use',content:[]}]),async()=>({}))).status,'incomplete');
const failed=await run(scripted([calls,end]),async()=>{throw Error('provider unavailable');});
assert.equal((failed.history[2].content as {is_error:boolean}[]).every(x=>x.is_error),true);
assert.equal((await run(scripted([{stop_reason:'end_turn',content:calls.content}]),async()=>({}))).status,'incomplete');
const permission=await run(scripted([calls,end]),async()=>({ok:false,category:'permission',retryable:false,message:'Denied'}));
const permissionResult=(permission.history[2].content as {is_error:boolean;content:string}[])[0];
assert.equal(permissionResult.is_error,true);
assert.equal(JSON.parse(permissionResult.content).category,'permission');
assert.equal(JSON.parse(permissionResult.content).retryable,false);
const unexpected=await run(scripted([calls,end]),async()=>{throw new TypeError('unexpected bug');});
const unexpectedResult=JSON.parse((unexpected.history[2].content as {content:string}[])[0].content);
assert.equal(unexpectedResult.category,'internal');
assert.equal(unexpectedResult.retryable,false);
assert.equal(normalizeOutcome({unknown:'shape'}).ok,false);
assert.deepEqual(normalizeOutcome({ok:true,data:[]}),{ok:true,data:[]});
console.log('03-bucle-agente: comprobaciones correctas; errores preservados y límites distintos de éxito');
export {run};
