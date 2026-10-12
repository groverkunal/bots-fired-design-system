import {readdir,readFile,writeFile,mkdir} from 'node:fs/promises';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
// Keep Astro's island bootstrap compatible with the existing self-only script CSP.
// No CSP or access policy is changed: executable inline bootstraps become local files.
async function walk(dir){const found=[];for(const e of await readdir(dir,{withFileTypes:true})){const path=join(dir,e.name);if(e.isDirectory())found.push(...await walk(path));else if(path.endsWith('.html'))found.push(path)}return found}
await mkdir('dist/_astro',{recursive:true});const outputs=new Map();
for(const path of await walk('dist')){if(path.startsWith('dist/assets/'))continue;let html=await readFile(path,'utf8');html=html.replace(/<script([^>]*)>([\s\S]*?)<\/script>/g,(whole,attrs,code)=>{if(/\bsrc\s*=/.test(attrs)||/type=["']application\//.test(attrs)||!code.trim())return whole;const hash=createHash('sha256').update(code).digest('hex').slice(0,20);const file=`bf-runtime-${hash}.js`;outputs.set(file,code);return `<script${attrs} src="/_astro/${file}"></script>`});await writeFile(path,html)}
for(const [file,code]of outputs)await writeFile(join('dist/_astro',file),code);
console.log(`Externalized ${outputs.size} local bootstrap scripts without modifying CSP.`);
