import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
const p = await b.newPage({viewport:{width:1280,height:900}});

const sm = await (await fetch('http://localhost:3000/sitemap.xml')).text();
const urls = [...sm.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1].replace('https://perlatorres.com','http://localhost:3000')||'http://localhost:3000');

console.log('RUTA'.padEnd(48), 'H1 H2  TÍTULO  DESC  CANON SCHEMA ENL→TALENTORIA');
let fallos = [];
const anchors = new Map();

for (const u of urls) {
  const r = await p.goto(u === 'http://localhost:3000' ? 'http://localhost:3000/' : u, {waitUntil:'domcontentloaded'});
  const d = await p.evaluate(() => {
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>{try{return JSON.parse(s.textContent)}catch{return null}}).filter(Boolean);
    const tipos = ld.flatMap(g => (g['@graph']||[g]).map(n=>n['@type']));
    const ext = [...document.querySelectorAll('a[href*="talentoria.com"]')].map(a=>({href:a.getAttribute('href'), txt:a.textContent.trim()}));
    return {
      h1: document.querySelectorAll('h1').length,
      h2: document.querySelectorAll('h2').length,
      titulo: (document.title||'').length,
      desc: (document.querySelector('meta[name="description"]')?.content||'').length,
      canon: !!document.querySelector('link[rel="canonical"]'),
      tipos: [...new Set(tipos)],
      ext,
      lang: document.documentElement.lang,
    };
  });

  const ruta = new URL(p.url()).pathname;
  const ok = (v,c)=> c ? String(v) : `\x1b[31m${v}\x1b[0m`;
  console.log(
    ruta.padEnd(48),
    ok(d.h1, d.h1===1), ok(String(d.h2).padEnd(3), d.h2>=1),
    ok(String(d.titulo).padEnd(6), d.titulo>10 && d.titulo<=65),
    ok(String(d.desc).padEnd(5), d.desc>=120 && d.desc<=165),
    ok(String(d.canon).padEnd(5), d.canon),
    d.tipos.join('+').padEnd(38),
    d.ext.length
  );

  if (r.status()!==200) fallos.push(`${ruta}: HTTP ${r.status()}`);
  if (d.h1!==1) fallos.push(`${ruta}: ${d.h1} H1`);
  if (d.desc<120||d.desc>165) fallos.push(`${ruta}: meta description ${d.desc} car.`);
  if (d.titulo>65) fallos.push(`${ruta}: título ${d.titulo} car.`);
  if (d.ext.length>2) fallos.push(`${ruta}: ${d.ext.length} enlaces a Talentoría (máx 2)`);
  d.ext.forEach(e=>{
    if (anchors.has(e.txt) && anchors.get(e.txt)!==ruta) fallos.push(`ANCHOR REPETIDO "${e.txt}" en ${ruta} y ${anchors.get(e.txt)}`);
    anchors.set(e.txt, ruta);
  });
}

console.log('\n=== ANCHORS HACIA TALENTORIA ===');
[...anchors].forEach(([txt, ruta])=>console.log(`  ${ruta.padEnd(46)} "${txt}"`));
console.log('\n=== INCIDENCIAS ===');
console.log(fallos.length ? fallos.join('\n') : 'ninguna');
await b.close();
