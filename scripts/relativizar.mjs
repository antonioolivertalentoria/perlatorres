/**
 * Convierte la exportación estática de Next en algo navegable con file://
 *
 * Tres cambios por archivo HTML:
 *  1. Inyecta <base href="…"> apuntando a la raíz de la exportación, para que
 *     todo lo relativo se resuelva desde ahí sin importar la profundidad.
 *  2. Cambia las rutas absolutas /_next/… por relativas _next/… (las absolutas
 *     con file:// apuntan a la raíz del disco).
 *  3. Cambia los enlaces internos /algo/ por algo/index.html.
 *
 * Y uno en el runtime de webpack: su publicPath también viene absoluto, y es
 * el que carga el chunk del 3D.
 */
import fs from 'node:fs';
import path from 'node:path';

const RAIZ = path.resolve('out');

function htmls(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return e.name === '_next' ? [] : htmls(p);
    return e.name.endsWith('.html') ? [p] : [];
  });
}

const archivos = htmls(RAIZ);
let enlaces = 0;

for (const archivo of archivos) {
  const profundidad = path.relative(RAIZ, path.dirname(archivo)).split(path.sep).filter(Boolean).length;
  const prefijo = profundidad === 0 ? './' : '../'.repeat(profundidad);
  let html = fs.readFileSync(archivo, 'utf8');

  html = html.replace(/<head>/, `<head><base href="${prefijo}">`);
  html = html.replace(/(["'(\\])\/_next\//g, '$1_next/');
  html = html.replace(/(["'(\\])\/icon\.svg/g, '$1icon.svg');

  html = html.replace(/href="\/([^"#?]*)"/g, (m, ruta) => {
    if (ruta.startsWith('_next') || ruta.startsWith('http')) return m;
    enlaces++;
    return `href="${ruta === '' ? 'index.html' : ruta.replace(/\/$/, '') + '/index.html'}"`;
  });

  fs.writeFileSync(archivo, html);
}

// El CSS referencia las fuentes con /_next/static/media/… y esas URLs no
// obedecen a <base>: se resuelven contra la ubicación del propio CSS.
const dirCss = path.join(RAIZ, '_next/static/css');
let hojas = 0;
if (fs.existsSync(dirCss)) {
  for (const f of fs.readdirSync(dirCss).filter((f) => f.endsWith('.css'))) {
    const p = path.join(dirCss, f);
    fs.writeFileSync(p, fs.readFileSync(p, 'utf8').split('/_next/static/media/').join('../media/'));
    hojas++;
  }
}

const dirChunks = path.join(RAIZ, '_next/static/chunks');
const webpacks = fs.readdirSync(dirChunks).filter((f) => f.startsWith('webpack-'));
for (const w of webpacks) {
  const p = path.join(dirChunks, w);
  fs.writeFileSync(p, fs.readFileSync(p, 'utf8').split('"/_next/"').join('"_next/"'));
}

console.log(
  `${archivos.length} páginas · ${enlaces} enlaces internos · ${hojas} hoja(s) de estilo · ${webpacks.length} runtime(s) de webpack`,
);
