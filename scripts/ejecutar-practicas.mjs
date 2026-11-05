import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const labs=['01-extraccion','02-herramientas','03-bucle-agente','04-contexto','05-claude-code','06-ejemplos-aplicados'];
for(const lab of labs){
  execFileSync(process.execPath,['--experimental-strip-types',path.join(root,'practicas',lab,'solucion.ts')],{stdio:'inherit'});
}
console.log('Todas las prácticas locales terminaron. Esto no evalúa todavía al alumno.');
