import assert from 'node:assert/strict';
type Extraction = { title: string; date: string | null; category: 'family'|'travel'|'other'|'unclear'; detail: string|null; sourceId: string };
type Source = { id: string; text: string };
type Result = { ok: true; value: Extraction } | { ok: false; errors: string[] };
function validate(raw: string, source: Source): Result {
  let x: unknown;
  try { x=JSON.parse(raw); } catch { return {ok:false,errors:['syntax: invalid JSON']}; }
  if (typeof x!=='object'||x===null||Array.isArray(x)) return {ok:false,errors:['schema: object required']};
  const o=x as Record<string,unknown>;const errors:string[]=[];
  const expected=['title','date','category','detail','sourceId'];
  for(const key of expected) if(!Object.hasOwn(o,key)) errors.push(`schema: missing ${key}`);
  for(const key of Object.keys(o)) if(!expected.includes(key)) errors.push(`schema: unexpected ${key}`);
  if(typeof o.title!=='string'||!o.title.trim()) errors.push('schema: title must be nonempty text');
  if(typeof o.category!=='string'||!['family','travel','other','unclear'].includes(o.category)) errors.push('schema: invalid category');
  if(o.detail!==null&&typeof o.detail!=='string') errors.push('schema: detail must be text or null');
  if(o.category==='other'&&(typeof o.detail!=='string'||!o.detail.trim())) errors.push('business: other requires detail');
  if(o.sourceId!==source.id) errors.push('evidence: sourceId does not match provided source');
  if(o.date!==null) {
    if(typeof o.date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(o.date)) errors.push('schema: date must be ISO date or null');
    else {
      const parsed=new Date(o.date+'T00:00:00Z');
      if(!Number.isFinite(parsed.getTime())||parsed.toISOString().slice(0,10)!==o.date) errors.push('business: invalid calendar date');
      else if(!source.text.includes(o.date)) errors.push('evidence: exact ISO date absent from this fixture source');
    }
  }
  return errors.length?{ok:false,errors}:{ok:true,value:o as Extraction};
}
const source={id:'carta-1',text:'Viajamos el 2004-08-12. Fue una visita familiar.'};
const valid={title:'Una visita',date:'2004-08-12',category:'family',detail:null,sourceId:'carta-1'};
assert.equal(validate(JSON.stringify(valid),source).ok,true);
assert.equal(validate(JSON.stringify({...valid,date:null}),source).ok,true);
assert.equal(validate('{broken',source).ok,false);
assert.equal(validate(JSON.stringify({...valid,date:'2004-02-31'}),source).ok,false);
assert.equal(validate(JSON.stringify({...valid,date:'2005-08-12'}),source).ok,false);
assert.equal(validate(JSON.stringify({...valid,category:'other'}),source).ok,false);
assert.equal(validate(JSON.stringify({...valid,sourceId:'otra-carta'}),source).ok,false);
const {date:_,...missing}=valid;assert.equal(validate(JSON.stringify(missing),source).ok,false);
assert.equal(validate(JSON.stringify({...valid,approved:true}),source).ok,false);
assert.equal(validate(JSON.stringify({...valid,category:['family']}),source).ok,false);
console.log('01-extraccion: 10 comprobaciones correctas');
export {validate};
