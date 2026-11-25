// Baja fotos reales de Caucasia para el flyer y el video de Mesa del Comercio al Día
// Fuentes: fotos de las noticias (og:image), Wikimedia Commons y satélite Esri
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36';
const RUIDO = /asesin|homicid|sicari|muert|cad[aá]ver|captur|balacera|violaci|secuestr|hurt|robo|moto|plan pistola|extorsi|droga/i;
await mkdir('promo/fotos', { recursive: true });
const lista = [];
const traer = async (u, ms = 20000) => { const r = await fetch(u, { headers: { 'user-agent': UA }, signal: AbortSignal.timeout(ms), redirect: 'follow' }); if (!r.ok) throw new Error(r.status); return r; };
async function guardar(url, meta, minW = 800) {
  try {
    const buf = Buffer.from(await (await traer(url)).arrayBuffer());
    const { data, info } = await sharp(buf).resize(64, 64, { fit: 'fill' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    let b = 0; for (let i = 0; i < data.length; i += 3) if (data[i] > 235 && data[i + 1] > 235 && data[i + 2] > 235) b++;
    const m = await sharp(buf).metadata();
    if (b / (info.width * info.height) > 0.2 || m.width < minW) { console.log('descarto', url); return; }
    const f = `promo/fotos/foto${lista.length + 1}.jpg`;
    await sharp(buf).rotate().jpeg({ quality: 90 }).toFile(f);
    lista.push({ archivo: f, ancho: m.width, alto: m.height, ...meta });
    console.log('ok', f, meta.fuente, meta.titulo?.slice(0, 60));
  } catch (e) { console.log('falló', url, e.message); }
}
async function og(url) {
  try {
    const html = (await (await traer(url, 15000)).text()).slice(0, 400000);
    const m = html.match(/<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["'](?:og:image|twitter:image)["']/i);
    return m ? new URL(m[1].replace(/&amp;/g, '&'), url).href : '';
  } catch { return ''; }
}
// 1) Fotos de noticias positivas de Caucasia
const n = JSON.parse(await readFile('data/noticias.json', 'utf8'));
const vistas = new Set();
for (const it of n.items) {
  if (RUIDO.test(it.titulo) || lista.length >= 10) continue;
  const img = it.imagen || await og(it.url);
  if (!img || vistas.has(img) || /logo|favicon|googleusercontent|gstatic/i.test(img)) continue;
  vistas.add(img);
  await guardar(img, { fuente: it.fuente, titulo: it.titulo, url: it.url });
}
// 1b) Historias empresariales del Bajo Cauca (El Colombiano) — fotos reales y optimistas
const SERIES = ['https://www.elcolombiano.com/grandes-historias-empresariales-bajo-cauca', 'https://www.elcolombiano.com/grandes-historias-mujeres-empresarias-bajo-cauca'];
const ARTS = new Set(['https://www.elcolombiano.com/grandes-historias-empresariales-bajo-cauca/hace-30-anos-la-hacienda-provee-de-materiales-a-caucasia-HA31750025']);
for (const s of SERIES) {
  try {
    const html = await (await traer(s, 15000)).text();
    for (const m of html.matchAll(/href=["']((?:https:\/\/www\.elcolombiano\.com)?\/grandes-historias-[a-z-]*bajo-cauca\/[a-z0-9-]+-[A-Z]{2}\d+)["']/g)) ARTS.add(new URL(m[1], 'https://www.elcolombiano.com').href);
  } catch (e) { console.log('serie falló', s, e.message); }
}
console.log('artículos de la serie:', ARTS.size);
for (const a of [...ARTS].slice(0, 14)) {
  if (lista.length >= 16) break;
  const img = await og(a);
  if (!img || vistas.has(img)) continue;
  vistas.add(img);
  const t = a.split('/').pop().replace(/-[A-Z]{2}\d+$/, '').replace(/-/g, ' ');
  await guardar(img, { fuente: 'El Colombiano', titulo: t, url: a, serie: true });
}
// 2) Wikimedia Commons: fotos libres de Caucasia
for (const q of ['Caucasia Antioquia', 'Caucasia Colombia río Cauca', 'Puente Carlos Lleras Restrepo Caucasia']) {
  try {
    const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=12&gsrsearch=${encodeURIComponent(q)}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1800`;
    const j = await (await traer(api)).json();
    console.log('commons', q, Object.keys(j.query?.pages || {}).length);
    for (const p of Object.values(j.query?.pages || {})) {
      const ii = p.imageinfo?.[0]; if (!ii || !/\.jpe?g$/i.test(ii.url) || vistas.has(ii.url)) continue;
      if (!/caucasia/i.test(p.title + (ii.extmetadata?.ImageDescription?.value || ''))) continue;
      vistas.add(ii.url);
      const autor = (ii.extmetadata?.Artist?.value || '').replace(/<[^>]+>/g, '').trim().slice(0, 40);
      await guardar(ii.thumburl || ii.url, { fuente: `Wikimedia Commons${autor ? ' · ' + autor : ''}`, titulo: p.title, url: ii.descriptionurl });
    }
  } catch (e) { console.log('commons falló', q, e.message); }
}
// 3) Satélite real (Esri World Imagery)
const SAT = [
  ['sat-caucasia', -75.230, 7.955, -75.165, 8.010, 1500, 1400],
  ['sat-centro', -75.2050, 7.9800, -75.1900, 7.9930, 1400, 1300],
  ['sat-rio', -75.215, 7.970, -75.170, 8.005, 1400, 1300],
  ['sat-region', -75.45, 7.60, -74.80, 8.20, 1500, 1400]
];
for (const [nom, x1, y1, x2, y2, w, h] of SAT) {
  try {
    const u = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=${x1},${y1},${x2},${y2}&bboxSR=4326&imageSR=3857&size=${w},${h}&format=jpg&f=image`;
    await sharp(Buffer.from(await (await traer(u, 30000)).arrayBuffer())).jpeg({ quality: 92 }).toFile(`promo/fotos/${nom}.jpg`);
    lista.push({ archivo: `promo/fotos/${nom}.jpg`, fuente: 'Esri World Imagery (satélite)' });
  } catch (e) { console.log('sat falló', nom, e.message); }
}
await writeFile('promo/fotos/creditos.json', JSON.stringify(lista, null, 1));
console.log('fotos:', lista.length);
