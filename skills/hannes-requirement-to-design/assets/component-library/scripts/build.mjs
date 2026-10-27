import { build } from 'esbuild';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const outputFile = path.resolve(projectRoot, '../library.html');
const htmlEscape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

async function runtimeNotices(metafile) {
  const packages = new Map();
  const bundled = new Set(Object.values(metafile.outputs).flatMap(output => Object.entries(output.inputs).filter(([, info]) => info.bytesInOutput > 0).map(([input]) => input)));
  for (const input of bundled) {
    if (!input.includes('node_modules/')) continue;
    let folder = path.dirname(path.resolve(projectRoot, input));
    while (folder.startsWith(projectRoot) && folder !== projectRoot) {
      try {
        const pkg = JSON.parse(await readFile(path.join(folder, 'package.json'), 'utf8'));
        if (!pkg.name || !pkg.version) throw new Error('Not a package root');
        packages.set(`${pkg.name}@${pkg.version}`, { folder, pkg });
        break;
      } catch { folder = path.dirname(folder); }
    }
  }
  const entries = [];
  const overrides = JSON.parse(await readFile(path.join(projectRoot, 'licenses/overrides.json'), 'utf8'));
  for (const [name, { folder, pkg }] of [...packages.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const candidates = (await readdir(folder)).filter(file => /^(licen[cs]e|copying|notice)([.-]|$)/i.test(file));
    const texts = await Promise.all(candidates.sort().map(async file => `${file}\n${await readFile(path.join(folder, file), 'utf8')}`));
    if (!texts.length && overrides[name]) {
      const override = overrides[name];
      texts.push(`Upstream license: ${override.source}\n${await readFile(path.join(projectRoot, 'licenses', override.file), 'utf8')}`);
    }
    if (!texts.length) {
      // Some packages (is-mobile 5.0.0) carry the full permission text inside README.
      const readme = (await readdir(folder)).find(file => /^readme\.md$/i.test(file));
      const content = readme ? await readFile(path.join(folder, readme), 'utf8') : '';
      const section = content.match(/^## License\s*\n([\s\S]*?)(?=^## |$(?![\s\S]))/m)?.[1];
      if (section?.includes('Permission is hereby granted')) texts.push(`${readme} — License section\n${section}`);
    }
    if (!texts.length) throw new Error(`Runtime package ${name} has no discoverable license; review before distributing`);
    entries.push(`${name}\nDeclared license: ${typeof pkg.license === 'string' ? pkg.license : JSON.stringify(pkg.license)}\n${texts.join('\n\n')}`);
  }
  if (!entries.length) throw new Error('No runtime license metadata found');
  return { count: entries.length, text: 'Hannes Ant Component Library — bundled runtime notices\n\n' + entries.join('\n\n' + '='.repeat(72) + '\n\n') };
}
export async function buildLibrary({ quiet = false } = {}) {
  const pkg = JSON.parse(await readFile(path.join(projectRoot, 'package.json'), 'utf8'));
  const fileNames = ['demos.jsx', 'Workbench.jsx', 'components.jsx', 'theme.jsx', 'data.mjs'];
  const sources = Object.fromEntries(await Promise.all(fileNames.map(async file => [file, await readFile(path.join(projectRoot, 'src', file), 'utf8')])));
  // First pass discovers the exact modules present in this build, rather than guessing from package.json.
  const options = {
    absWorkingDir: projectRoot, entryPoints: ['src/main.jsx'], bundle: true, write: false, outfile: 'bundle.js',
    format: 'iife', platform: 'browser', target: ['chrome110', 'safari16.4', 'firefox115'], jsx: 'automatic',
    minify: true, legalComments: 'none', metafile: true,
    define: { 'process.env.NODE_ENV': '"production"', __SOURCES__: JSON.stringify(sources), __VERSIONS__: JSON.stringify(pkg.dependencies), __LICENSE_TEXT__: '""' },
  };
  const probe = await build(options);
  const notices = await runtimeNotices(probe.metafile);
  const result = await build({ ...options, define: { ...options.define, __LICENSE_TEXT__: JSON.stringify(notices.text) } });
  const js = result.outputFiles.find(file => file.path.endsWith('.js')).text.replace(/<\/script/gi, '<\\/script');
  const css = result.outputFiles.find(file => file.path.endsWith('.css'))?.text || '';
  const html = `<!doctype html>
<html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light"><title>Hannes · Ant Design 组件实验室</title><style>${css.replace(/<\/style/gi, '<\\/style')}</style></head>
<body><div id="root"></div><noscript>组件目录需要启用 JavaScript；无需网络连接。</noscript><pre hidden id="third-party-notices">${htmlEscape(notices.text)}</pre><script>${js}</script></body></html>\n`;
  await writeFile(outputFile, html);
  if (!quiet) console.log(`Built assets/library.html (${(Buffer.byteLength(html) / 1024 / 1024).toFixed(2)} MiB), ${notices.count} runtime package notices, 5 exact source modules.`);
  return { outputFile, noticesCount: notices.count, bytes: Buffer.byteLength(html) };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await buildLibrary();
