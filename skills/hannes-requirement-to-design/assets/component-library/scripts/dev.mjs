import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import path from 'node:path';
import { buildLibrary, projectRoot } from './build.mjs';

await buildLibrary();
let timer, queue = Promise.resolve();
const schedule = () => { clearTimeout(timer); timer = setTimeout(() => { queue = queue.then(() => buildLibrary()).catch(error => console.error(error.message)); }, 150); };
const watcher = watch(path.join(projectRoot, 'src'), { recursive: true }, schedule);
const assetsRoot = path.resolve(projectRoot, '..');
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = path.resolve(assetsRoot, `.${pathname === '/' ? '/library.html' : pathname}`);
    if (!file.startsWith(assetsRoot + path.sep) || !(await stat(file)).isFile()) throw new Error('Not found');
    response.setHeader('Content-Type', file.endsWith('.html') ? 'text/html; charset=utf-8' : 'text/plain; charset=utf-8');
    response.setHeader('Cache-Control', 'no-store'); response.end(await readFile(file));
  } catch { response.writeHead(404).end('Not found'); }
});
server.on('error', error => { console.error(error.message); watcher.close(); process.exitCode = 1; });
server.listen(4173, '127.0.0.1', () => console.log('Preview http://127.0.0.1:4173 — source changes rebuild; refresh browser. Ctrl+C stops.'));
const close = () => { clearTimeout(timer); watcher.close(); server.close(); };
process.on('SIGINT', close); process.on('SIGTERM', close);
