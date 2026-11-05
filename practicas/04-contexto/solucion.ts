import assert from 'node:assert/strict';
type Claim={field:string;value:string;sourceId:string;eventDate:string;publishedAt:string};
type Saved={objective:string;facts:Record<string,string>;claims:Claim[];pending:string[];errors:{sourceId:string;category:string}[]};
function buildContext(saved:Saved,currentlyAllowed:Set<string>){
 const claims=saved.claims.filter(c=>currentlyAllowed.has(c.sourceId));
 const fields=[...new Set(claims.map(c=>c.field))];
 const conflicts=fields.filter(f=>new Set(claims.filter(c=>c.field===f).map(c=>c.value)).size>1);
 const excluded=saved.claims.filter(c=>!currentlyAllowed.has(c.sourceId)).map(c=>c.sourceId);
 return {objective:saved.objective,facts:{...saved.facts},claims,conflicts,pending:[...saved.pending,...excluded.map(id=>`revalidate excluded source ${id}`)],errors:[...saved.errors]};
}
type Labeled={kind:string;field:string;confidence:number;correct:boolean};
function errorBySegment(rows:Labeled[]){
 const out:Record<string,{total:number;errors:number;errorRate:number}>={};
 for(const row of rows){const key=row.kind+':'+row.field;const s=out[key]??{total:0,errors:0,errorRate:0};s.total++;if(!row.correct)s.errors++;s.errorRate=s.errors/s.total;out[key]=s;}
 return out;
}
function sampleHighConfidence(rows:Labeled[],seed=7){
 const groups=new Map<string,Labeled[]>();
 for(const row of rows.filter(x=>x.confidence>=.9)){const key=row.kind+':'+row.field;groups.set(key,[...(groups.get(key)??[]),row]);}
 return [...groups.entries()].map(([stratum,items])=>{seed=(seed*1664525+1013904223)>>>0;return {stratum,item:items[seed%items.length]};});
}
const saved:Saved={objective:'Prepare an evidence-backed draft',facts:{caseId:'case-7'},claims:[
 {field:'year',value:'2003',sourceId:'s1',eventDate:'2003-06-01',publishedAt:'2020-01-01'},
 {field:'year',value:'2004',sourceId:'s2',eventDate:'2004-06-01',publishedAt:'2021-01-01'},
 {field:'private',value:'do not include',sourceId:'restricted',eventDate:'2005-01-01',publishedAt:'2022-01-01'},
],pending:['Ask about conflicting dates'],errors:[{sourceId:'s3',category:'transient'}]};
const context=buildContext(saved,new Set(['s1','s2']));
assert.equal(context.facts.caseId,'case-7');assert.deepEqual(context.conflicts,['year']);
assert.equal(context.claims.length,2);assert.equal(context.pending.length,2);
assert.equal(context.errors[0].category,'transient');assert.equal(saved.claims.length,3);
const labeled:Labeled[]=[
 {kind:'typed',field:'date',confidence:.95,correct:true},{kind:'typed',field:'date',confidence:.96,correct:true},
 {kind:'letter',field:'date',confidence:.95,correct:false},{kind:'letter',field:'date',confidence:.94,correct:false},
 {kind:'letter',field:'title',confidence:.8,correct:true},
];
const rates=errorBySegment(labeled);
assert.equal(rates['typed:date'].errorRate,0);assert.equal(rates['letter:date'].errorRate,1);
assert.deepEqual(sampleHighConfidence(labeled).map(x=>x.stratum).sort(),['letter:date','typed:date']);
assert.deepEqual(sampleHighConfidence(labeled,7),sampleHighConfidence(labeled,7));
console.log('04-contexto: 10 comprobaciones correctas');
export {buildContext,errorBySegment,sampleHighConfidence};
