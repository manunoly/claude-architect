import {createHash} from 'node:crypto';
import {createReadStream} from 'node:fs';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const manifest = JSON.parse(await readFile(path.join(root, 'biblioteca', 'manifest.json'), 'utf8'));
const failures = [];
let verified = 0;
for (const entry of manifest) {
  if (entry.status !== 'downloaded') {
    failures.push({id: entry.id, reason: 'Source was not downloaded'});
    continue;
  }
  const target = path.resolve(root, entry.file);
  const relative = path.relative(root, target);
  if (relative === '..' || relative.startsWith('..' + path.sep) || path.isAbsolute(relative)) {
    failures.push({id: entry.id, reason: 'Path outside project'});
    continue;
  }
  try {
    const digest = createHash('sha256');
    for await (const chunk of createReadStream(target)) digest.update(chunk);
    if (digest.digest('hex') !== entry.sha256) failures.push({id: entry.id, reason: 'SHA-256 mismatch'});
    else verified++;
  } catch (error) {
    failures.push({id: entry.id, reason: String(error)});
  }
}
console.log(JSON.stringify({verified, failures}, null, 2));
if (failures.length) process.exitCode = 1;
