import assert from 'node:assert/strict';
type Memory={id:string;owner:string;opensAt:string;body:string};
type Failure={ok:false;category:'validation'|'permission'|'policy'|'transient';retryable:boolean;message:string};
type Outcome<T>={ok:true;data:T}|Failure;
const now=Date.parse('2026-11-05T12:00:00Z');
const rows:Memory[]=[
 {id:'m1',owner:'u1',opensAt:'2020-01-01T00:00:00Z',body:'Una visita al mar'},
 {id:'m2',owner:'u1',opensAt:'2030-01-01T00:00:00Z',body:'Contenido sellado'},
 {id:'m3',owner:'u2',opensAt:'2020-01-01T00:00:00Z',body:'Recuerdo privado de otra persona'},
];
function readMemory(identity:string,args:unknown):Outcome<Memory>{
 if(typeof args!=='object'||args===null||Array.isArray(args)) return {ok:false,category:'validation',retryable:false,message:'Object required'};
 const a=args as Record<string,unknown>;
 if(Object.keys(a).some(k=>k!=='id')||typeof a.id!=='string') return {ok:false,category:'validation',retryable:false,message:'Only memory id is accepted'};
 const row=rows.find(x=>x.id===a.id);
 if(!row||row.owner!==identity) return {ok:false,category:'permission',retryable:false,message:'Resource unavailable for this identity'};
 if(Date.parse(row.opensAt)>now) return {ok:false,category:'policy',retryable:false,message:'Capsule is not open'};
 return {ok:true,data:{...row}};
}
function searchMemory(identity:string,term:string):Outcome<{id:string}[]>{
 return {ok:true,data:rows.filter(x=>x.owner===identity&&Date.parse(x.opensAt)<=now&&x.body.includes(term)).map(x=>({id:x.id}))};
}
function providerUnavailable():Failure{return {ok:false,category:'transient',retryable:true,message:'Source temporarily unavailable'};}
function asMcp(result:Outcome<unknown>){return {isError:!result.ok,content:[{type:'text',text:JSON.stringify(result)}]};}
function asClaude(toolUseId:string,result:Outcome<unknown>){return {type:'tool_result',tool_use_id:toolUseId,is_error:!result.ok,content:JSON.stringify(result)};}
assert.equal(readMemory('u1',{id:'m1'}).ok,true);
assert.equal(readMemory('u1',{id:'m2'}).ok,false);
assert.equal(readMemory('u1',{id:'m3'}).ok,false);
assert.equal(readMemory('u1',{id:'m3',owner:'u2'}).ok,false);
assert.deepEqual(searchMemory('u1','no existe'),{ok:true,data:[]});
assert.equal(providerUnavailable().ok,false);
assert.equal(providerUnavailable().retryable,true);
const denied=readMemory('u1',{id:'m2'});assert.equal(asMcp(denied).isError,true);
assert.equal(asClaude('call-9',denied).tool_use_id,'call-9');
assert.equal(asClaude('call-9',denied).is_error,true);
assert.deepEqual(searchMemory('u1','Contenido'),{ok:true,data:[]});
console.log('02-herramientas: 11 comprobaciones correctas');
export {readMemory,searchMemory,asMcp,asClaude};
