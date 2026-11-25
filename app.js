/* Mesa del Comercio al Día · Caucasia — Vibras Positivas HM */
'use strict';
const URL_APP = 'https://mesa-comercio-caucasia.netlify.app/';
const WA = '573117700431';
const TZ = 'America/Bogota';
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const num = n => Number(n).toLocaleString('es-CO');

/* Imagen de satélite real (Esri World Imagery) alrededor de un punto */
const sat = (lat, lng, d = 0.006, w = 900, h = 520) =>
  `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=${lng - d * 1.6},${lat - d},${lng + d * 1.6},${lat + d}&bboxSR=4326&imageSR=3857&size=${w},${h}&format=jpg&f=image`;

/* ---------- Idioma ---------- */
const T = {
  es: {
    nav_hoy:'Hoy', nav_comp:'Compromisos', nav_obras:'Obras', nav_voz:'Su voz', nav_peticion:'Petición', actualizar:'Actualizar',
    hero_pildora:'Caucasia, Antioquia · seguimiento ciudadano',
    hero_t1:'Que no sean solo palabras.', hero_t2:'Necesitamos hechos.',
    hero_sub:'La Alcaldía se sentó con más de 20 comerciantes y empresarios a hablar de espacio público, obras, alumbrado e impuestos. Aquí seguimos cada compromiso hasta que se cumpla.',
    reloj_dias:'días de seguimiento', reloj_sin:'compromisos sin fecha', reloj_ok:'cumplidos',
    hoy_t:'Hoy', hoy_i:'Lo último sobre el comercio, las obras y la Alcaldía de Caucasia. Se actualiza cada vez que usted entra y el robot trae noticias nuevas cada 30 minutos.',
    buscar_ph:'Buscar en vivo: carrera primera, alumbrado, impuestos…', buscar:'Buscar',
    hoy_ultimas:'Hoy todavía no hay noticias nuevas. Estas son las más recientes:', sin_noticias:'Buscando noticias en vivo…',
    busc_cargando:'Buscando en vivo…', busc_ok:'{n} resultados en vivo', busc_nada:'No llegaron resultados en vivo; mostramos lo que trajo el robot.',
    hace_min:'hace {n} min', hace_h:'hace {n} h', hace_d:'hace {n} d', nueva:'Nueva',
    me_t:'Lo que se habló en la mesa',
    est_escuchado:'Escuchado · sin compromiso', pedimos:'Lo que pedimos', ver_not:'Ver noticias', not_rel:'{n} noticias relacionadas',
    co_t:'El tablero de compromisos', co_i:'Cada promesa con su responsable, su fecha y su prueba. Mientras no haya acta ni fecha publicada, el compromiso queda en rojo.',
    e_pendiente:'Pendiente', e_en_marcha:'En marcha', e_cumplido:'Cumplido', e_incumplido:'Incumplido',
    sin_fecha:'Sin fecha publicada', meta:'Meta: {f}', prueba:'Ver prueba', responsable:'Responsable', dias_sin:'días esperando',
    mi_t:'Entre todos sacamos la región adelante', mi_i:'La responsabilidad es de dos lados: el gobierno cumple lo que promete y los comerciantes hacemos nuestra parte.',
    mi_gob:'Le toca a la Alcaldía', mi_com:'Nos toca a los comerciantes',
    ob_t:'Las obras en la vía', ob_i:'Imagen de satélite real de Caucasia. Toque una obra para ver dónde está y qué se sabe de ella.',
    li_t:'Una región próspera que puede ser líder', ln_t:'Cómo llegamos hasta aquí', fuente:'Fuente',
    vi_t:'Videos reales', vi_i:'Noticias y reportajes en video sobre Caucasia. El robot busca videos nuevos cada 30 minutos.',
    sin_videos:'El robot todavía está buscando videos. Mientras tanto, búsquelos aquí:', buscar_yt:'Ver videos de Caucasia en YouTube',
    vo_t:'Su voz: ¿qué necesita su negocio?', vo_i:'Cuéntenos su problema y su propuesta. Le llega por WhatsApp a Vibras Positivas HM y lo llevamos, con los demás, a la próxima mesa.',
    vo_negocio:'Negocio y barrio', vo_tema:'Tema', vo_problema:'¿Qué le está pasando?', vo_propuesta:'¿Qué propone?', vo_enviar:'Enviar por WhatsApp', vo_otro:'Otro tema',
    pe_t:'Derecho de petición: que nos muestren el acta y las fechas',
    pe_i:'Llene sus datos y envíe una sola petición a todas las entidades a la vez. La ley les da 15 días hábiles para responder (artículo 23 de la Constitución y Ley 1755 de 2015). Si una entidad no es la competente, debe pasarla a la que sí.',
    pe_nombre:'Nombre completo', pe_cc:'Cédula', pe_negocio:'Negocio o empresa (opcional)', pe_ciudad:'Ciudad', pe_correo:'Su correo para la respuesta', pe_tel:'Celular (opcional)',
    pe_dest:'Se envía a', pe_enviar:'Enviar a todas las entidades', pe_gmail:'Abrir en Gmail', pe_copiar:'Copiar texto',
    pe_nota:'La app no guarda sus datos: el correo sale desde su propia cuenta. Revise los correos de las entidades antes de enviar; pueden cambiar.',
    copiado:'Texto copiado',
    fu_t:'Todas las noticias', ver_mas:'Ver más',
    pie_txt:'App ciudadana independiente. No es de la Alcaldía ni de ningún partido. Todo lo que aparece trae su fuente. Hecha en Caucasia para que el comercio y el gobierno caminen con norte.',
    compartir:'Compartir por WhatsApp', robot:'Robot de noticias: {h} (hora Colombia)',
    compartir_txt:'Que no sean solo palabras: seguimiento ciudadano a los compromisos de la Alcaldía de Caucasia con los comerciantes (espacio público, obras, alumbrado e impuestos).'
  },
  en: {
    nav_hoy:'Today', nav_comp:'Commitments', nav_obras:'Road works', nav_voz:'Your voice', nav_peticion:'Petition', actualizar:'Refresh',
    hero_pildora:'Caucasia, Antioquia · citizen tracker',
    hero_t1:'Not just words.', hero_t2:'We need action.',
    hero_sub:'The mayor\'s office sat down with more than 20 merchants and business owners to discuss public space, road works, street lighting and taxes. We follow every commitment here until it is kept.',
    reloj_dias:'days of tracking', reloj_sin:'commitments without a date', reloj_ok:'kept',
    hoy_t:'Today', hoy_i:'The latest on commerce, road works and the Caucasia mayor\'s office. It refreshes every time you open it, and the robot brings new stories every 30 minutes.',
    buscar_ph:'Live search: carrera primera, lighting, taxes…', buscar:'Search',
    hoy_ultimas:'No new stories yet today. These are the most recent:', sin_noticias:'Searching live news…',
    busc_cargando:'Searching live…', busc_ok:'{n} live results', busc_nada:'No live results came back; showing what the robot found.',
    hace_min:'{n} min ago', hace_h:'{n} h ago', hace_d:'{n} d ago', nueva:'New',
    me_t:'What was discussed at the table',
    est_escuchado:'Heard · no commitment', pedimos:'What we ask for', ver_not:'See news', not_rel:'{n} related stories',
    co_t:'The commitment board', co_i:'Every promise with its owner, date and proof. Until minutes or a date are published, the commitment stays red.',
    e_pendiente:'Pending', e_en_marcha:'In progress', e_cumplido:'Kept', e_incumplido:'Broken',
    sin_fecha:'No date published', meta:'Target: {f}', prueba:'See proof', responsable:'Owner', dias_sin:'days waiting',
    mi_t:'Together we move the region forward', mi_i:'Responsibility runs both ways: the government keeps its promises and we merchants do our part.',
    mi_gob:'Up to the mayor\'s office', mi_com:'Up to us merchants',
    ob_t:'Road works', ob_i:'Real satellite image of Caucasia. Tap a project to see where it is and what we know about it.',
    li_t:'A prosperous region that can lead', ln_t:'How we got here', fuente:'Source',
    vi_t:'Real videos', vi_i:'News and video reports about Caucasia. The robot looks for new videos every 30 minutes.',
    sin_videos:'The robot is still looking for videos. Meanwhile, find them here:', buscar_yt:'See Caucasia videos on YouTube',
    vo_t:'Your voice: what does your business need?', vo_i:'Tell us your problem and your proposal. It reaches Vibras Positivas HM on WhatsApp and we take it, with the others, to the next session.',
    vo_negocio:'Business and neighborhood', vo_tema:'Topic', vo_problema:'What is happening to you?', vo_propuesta:'What do you propose?', vo_enviar:'Send on WhatsApp', vo_otro:'Other topic',
    pe_t:'Right of petition: show us the minutes and the dates',
    pe_i:'Fill in your details and send one petition to every agency at once. By law they have 15 business days to answer (Article 23 of the Constitution and Law 1755 of 2015). The petition is written in Spanish, as required by Colombian agencies.',
    pe_nombre:'Full name', pe_cc:'ID number (cédula)', pe_negocio:'Business (optional)', pe_ciudad:'City', pe_correo:'Your email for the answer', pe_tel:'Mobile (optional)',
    pe_dest:'Sent to', pe_enviar:'Send to all agencies', pe_gmail:'Open in Gmail', pe_copiar:'Copy text',
    pe_nota:'The app does not store your data: the email goes out from your own account. Check the agencies\' addresses before sending; they may change.',
    copiado:'Text copied',
    fu_t:'All news', ver_mas:'See more',
    pie_txt:'Independent citizen app. Not run by the mayor\'s office or any party. Everything shown carries its source. Made in Caucasia so commerce and government move with a clear direction.',
    compartir:'Share on WhatsApp', robot:'News robot: {h} (Colombia time)',
    compartir_txt:'Not just words: citizen tracking of the Caucasia mayor\'s commitments to local merchants (public space, road works, lighting and taxes).'
  }
};
let LANG = 'es';
try { LANG = localStorage.getItem('mc_lang') || (navigator.language || 'es').slice(0, 2); } catch {}
if (!T[LANG]) LANG = 'es';
const t = (k, v = {}) => (T[LANG][k] ?? T.es[k] ?? k).replace(/\{(\w+)\}/g, (_, x) => v[x]);
const Tx = (o, es = 'es', en = 'en') => (LANG === 'en' && o[en]) ? o[en] : o[es];

function aplicarIdioma() {
  document.documentElement.lang = LANG;
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  document.querySelectorAll('[data-i18n-ph]').forEach(el => el.placeholder = t(el.dataset.i18nPh));
  $('#btnLang').textContent = LANG === 'es' ? 'EN' : 'ES';
}

/* ---------- Fechas en hora de Colombia ---------- */
const fmtDia = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' });
const diaCO = d => fmtDia.format(new Date(d));
const hoyCO = () => diaCO(Date.now());
function fechaLarga(d, conHora) {
  return new Intl.DateTimeFormat(LANG === 'es' ? 'es-CO' : 'en-US', { timeZone: TZ, day: 'numeric', month: 'short', year: conHora ? undefined : 'numeric', hour: conHora ? 'numeric' : undefined, minute: conHora ? '2-digit' : undefined }).format(new Date(d));
}
const fechaCorta = f => new Intl.DateTimeFormat(LANG === 'es' ? 'es-CO' : 'en-US', { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(f + 'T12:00:00Z'));
const diasDesde = f => 1 + Math.max(0, Math.floor((new Date(hoyCO() + 'T12:00:00Z') - new Date(f + 'T12:00:00Z')) / 864e5));
function hace(d) {
  const m = Math.max(1, Math.round((Date.now() - new Date(d)) / 60000));
  if (m < 60) return t('hace_min', { n: m });
  if (m < 1440) return t('hace_h', { n: Math.round(m / 60) });
  return t('hace_d', { n: Math.round(m / 1440) });
}

/* ---------- Datos ---------- */
let D = { m: null, noticias: { items: [] }, videos: { items: [] } };
let enVivo = [];
async function cargarJSON(ruta) {
  const r = await fetch(`${ruta}?t=${Date.now()}`, { cache: 'no-store' });
  if (!r.ok) throw new Error(ruta);
  return r.json();
}
async function cargarTodo() {
  const [a, n, v] = await Promise.allSettled([cargarJSON('data/mesa.json'), cargarJSON('data/noticias.json'), cargarJSON('data/videos.json')]);
  if (a.status === 'fulfilled') D.m = a.value;
  if (n.status === 'fulfilled') D.noticias = n.value;
  if (v.status === 'fulfilled') D.videos = v.value;
}

/* ---------- Búsqueda en vivo (Google News + Bing por proxies) ---------- */
const ZONA = /caucasia|bajo cauca/i;
const RUIDO = /asesin|homicid|sicari|muert[oa]s?\b|cad[aá]ver|captur|balacera|violaci|secuestr|hurt|robo|plan pistola|extorsi/i;
const PROXIES = [
  u => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  u => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,
  u => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`
];
async function traerProxy(u) {
  for (const p of PROXIES) {
    try {
      const r = await fetch(p(u), { signal: AbortSignal.timeout(9000) });
      if (r.ok) { const txt = await r.text(); if (txt.includes('<item')) return txt; }
    } catch {}
  }
  throw new Error('proxies');
}
function parsearRSS(xml, bing) {
  const doc = new DOMParser().parseFromString(xml, 'text/xml');
  return [...doc.querySelectorAll('item')].map(it => {
    let titulo = it.querySelector('title')?.textContent?.trim() || '';
    let url = it.querySelector('link')?.textContent?.trim() || '';
    let fuente = it.querySelector('source')?.textContent?.trim() || '';
    if (bing) { try { url = new URL(url).searchParams.get('url') || url; } catch {} }
    else if (titulo.includes(' - ')) { const i = titulo.lastIndexOf(' - '); fuente = fuente || titulo.slice(i + 3); titulo = titulo.slice(0, i); }
    const f = new Date(it.querySelector('pubDate')?.textContent || Date.now());
    let foto = '';
    const media = [...it.getElementsByTagName('*')].find(e => /content|thumbnail|Image/i.test(e.localName) && (e.getAttribute('url') || /^https?:/.test(e.textContent)));
    if (media) foto = media.getAttribute('url') || media.textContent;
    if (/bing\.com\/th/.test(foto)) foto = '';
    if (!fuente) { try { fuente = new URL(url).hostname.replace(/^www\./, ''); } catch {} }
    return { titulo, url, fuente, fecha: isNaN(f) ? new Date().toISOString() : f.toISOString(), imagen: foto, vivo: true };
  }).filter(x => x.titulo && x.url);
}
async function buscarEnVivo(q) {
  const qq = q ? (ZONA.test(q) ? q : `${q} Caucasia`) : 'Caucasia comerciantes OR alcaldía OR obras';
  const g = `https://news.google.com/rss/search?q=${encodeURIComponent(qq + ' when:30d')}&hl=es-419&gl=CO&ceid=CO:es-419`;
  const b = `https://www.bing.com/news/search?q=${encodeURIComponent(q ? qq : 'Caucasia Antioquia')}&format=rss&setlang=es-CO&cc=CO&qft=sortbydate%3d%221%22`;
  const res = await Promise.allSettled([traerProxy(g).then(x => parsearRSS(x, false)), traerProxy(b).then(x => parsearRSS(x, true))]);
  const out = res.flatMap(r => r.status === 'fulfilled' ? r.value : []);
  return out.filter(x => (ZONA.test(x.titulo) || q) && !RUIDO.test(x.titulo));
}
const claveT = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, '').slice(0, 80);
function mezclar(...listas) {
  const m = new Map();
  for (const l of listas) for (const it of l) {
    const k = claveT(it.titulo);
    const prev = m.get(k);
    if (!prev) m.set(k, it); else if (!prev.imagen && it.imagen) prev.imagen = it.imagen;
  }
  return [...m.values()].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}
const todas = () => mezclar(enVivo, D.noticias.items || []);

/* ---------- Tarjetas ---------- */
function tarjeta(n, grande) {
  const nueva = Date.now() - new Date(n.fecha) < 6 * 3600e3;
  const sello = `<span class="tj-hace ${nueva ? 'nueva' : ''}">${nueva ? t('nueva') + ' · ' : ''}${hace(n.fecha)}</span>`;
  const foto = n.imagen
    ? `<div class="tj-foto" style="background-image:url('${esc(n.imagen)}')">${sello}</div>`
    : `<div class="tj-foto sin">${sello}${esc(n.fuente)}</div>`;
  return `<a class="tj rv ${grande ? 'grande' : ''}" href="${esc(n.url)}" target="_blank" rel="noopener">${foto}<div class="tj-cuerpo"><span class="tj-fuente">${esc(n.fuente)}</span><h3>${esc(n.titulo)}</h3></div></a>`;
}

/* ---------- Estado de los compromisos ---------- */
const comps = () => D.m?.compromisos || [];
const conFecha = () => comps().filter(c => c.fecha_meta).length;
const cumplidos = () => comps().filter(c => c.estado === 'cumplido').length;

/* ---------- Hero ---------- */
function pintarHero() {
  const fotos = todas().filter(n => n.imagen).slice(0, 6);
  const cont = $('#heroFotos');
  if (fotos.length && cont.dataset.n !== String(fotos.length)) {
    cont.dataset.n = fotos.length;
    cont.innerHTML = `<div class="on sat"></div>` + fotos.map(f => `<div style="background-image:url('${esc(f.imagen)}')"></div>`).join('');
  }
  $('#heroSub').textContent = t('hero_sub');
  if (!D.m) return;
  $('#marcador').innerHTML = D.m.cifras.map(c => {
    const valor = c.id === 'publicados' ? conFecha() : c.num;
    return `<div><span class="m-num ${c.id === 'publicados' && !valor ? 'rojo' : ''}">${esc(c.pre || '')}<b class="cuenta" data-fin="${valor}">0</b></span><span class="m-etq">${esc(Tx(c))}</span></div>`;
  }).join('');
  const dias = diasDesde(D.m.inicio_seguimiento);
  $('#reloj').innerHTML = `<span><b>${dias}</b>${t('reloj_dias')}</span><span class="sep"></span>
    <span><b>${comps().length - conFecha()}</b>${t('reloj_sin')}</span><span class="sep"></span>
    <span><b>${cumplidos()}</b>${t('reloj_ok')}</span>`;
}
function animarCuentas() {
  document.querySelectorAll('.cuenta').forEach(el => {
    const fin = +el.dataset.fin || 0, ini = performance.now(), dur = 1600;
    const paso = ahora => {
      const p = Math.min(1, (ahora - ini) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = num(Math.round(fin * e));
      if (p < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  });
}
let rotador;
function rotarHero() {
  clearInterval(rotador);
  rotador = setInterval(() => {
    const fs = [...document.querySelectorAll('#heroFotos div')];
    if (fs.length < 2) return;
    const i = Math.max(0, fs.findIndex(f => f.classList.contains('on')));
    fs[i].classList.remove('on'); fs[(i + 1) % fs.length].classList.add('on');
  }, 6000);
}
function pintarCinta() {
  const items = todas().slice(0, 14);
  if (!items.length) { $('#cinta').innerHTML = ''; return; }
  const html = items.map(n => `<a href="${esc(n.url)}" target="_blank" rel="noopener"><b>${esc(n.fuente)}</b>${esc(n.titulo)}</a>`).join('');
  $('#cinta').innerHTML = html + html;
}

/* ---------- Hoy ---------- */
const RAPIDAS = ['Alcaldía de Caucasia', 'comerciantes Caucasia', 'carrera primera', 'alumbrado', 'espacio público', 'impuestos', 'Bajo Cauca economía', 'Cámara de Comercio'];
function pintarRapidas() {
  $('#rapidas').innerHTML = RAPIDAS.map(r => `<button data-q="${esc(r)}">${esc(r)}</button>`).join('');
}
function pintarHoy() {
  const lista0 = todas();
  const hoy = hoyCO();
  let lista = lista0.filter(n => diaCO(n.fecha) === hoy);
  let pre = '';
  if (lista.length < 3) { pre = `<p class="intro" style="grid-column:1/-1;margin:0">${lista0.length ? t('hoy_ultimas') : t('sin_noticias')}</p>`; lista = lista0.slice(0, 7); }
  $('#hoyFecha').textContent = fechaLarga(Date.now(), true);
  $('#hoyLista').innerHTML = pre + lista.slice(0, 9).map((n, i) => tarjeta(n, i === 0)).join('');
  revelar();
}

/* ---------- Temas de la mesa ---------- */
const CLAVES = {
  espacio: /espacio p[uú]blico|vendedores|andenes|ambulante/i,
  obras: /obra|pavimen|v[ií]a|carrera primera|calle \d|malla vial/i,
  alumbrado: /alumbrado|luminaria|led\b|iluminaci/i,
  tributario: /impuesto|tribut|predial|industria y comercio|\bica\b|hacienda|recaudo/i
};
function pintarTemas() {
  if (!D.m) return;
  $('#meIntro').textContent = Tx(D.m.mesa);
  const ns = todas();
  $('#temas').innerHTML = D.m.temas.map((x, i) => {
    const rel = ns.filter(n => CLAVES[x.id]?.test(n.titulo));
    const foto = rel.find(n => n.imagen)?.imagen || sat(x.lat, x.lng);
    return `<article class="tema rv">
      <div class="tema-foto" style="background-image:url('${esc(foto)}')"><span class="tema-n">0${i + 1}</span><span class="tema-est">${t('est_escuchado')}</span></div>
      <div class="tema-in">
        <h3>${esc(Tx(x))}</h3>
        <p>${esc(Tx(x, 'texto_es', 'texto_en'))}</p>
        <span class="tema-pide">${t('pedimos')}</span>
        <ul>${(LANG === 'en' ? x.pedimos_en : x.pedimos_es).map(p => `<li>${esc(p)}</li>`).join('')}</ul>
        ${rel.length ? `<span class="tema-not">${t('not_rel', { n: rel.length })}</span>` : ''}
        <button class="tema-ver" data-q="${esc(x.busca)}">${t('ver_not')}</button>
      </div></article>`;
  }).join('');
}

/* ---------- Tablero de compromisos ---------- */
const COLOR = { pendiente: 'var(--rojo)', en_marcha: '#f59e0b', cumplido: 'var(--verde)', incumplido: '#4b5563' };
function pintarTablero() {
  if (!D.m) return;
  const cs = comps();
  const cuenta = e => cs.filter(c => c.estado === e).length;
  $('#resumen').innerHTML = ['pendiente', 'en_marcha', 'cumplido', 'incumplido'].map(e =>
    `<span class="sr"><i style="background:${COLOR[e]}"></i>${t('e_' + e)} <b>${cuenta(e)}</b></span>`).join('');
  const dias = diasDesde(D.m.inicio_seguimiento);
  $('#tablero').innerHTML = cs.map(c => `<div class="cp rv">
      <div class="cp-barra" style="background:${COLOR[c.estado] || COLOR.pendiente}"></div>
      <div>
        <h3>${esc(Tx(c))}</h3>
        <div class="cp-meta"><span>${t('responsable')}: <b>${esc(c.quien)}</b></span>
          <span>${c.fecha_meta ? t('meta', { f: fechaCorta(c.fecha_meta) }) : t('sin_fecha')}</span>
          ${c.prueba ? `<a href="${esc(c.prueba)}" target="_blank" rel="noopener">${t('prueba')}</a>` : ''}</div>
      </div>
      <div class="cp-est"><span class="e-${esc(c.estado)}">${t('e_' + c.estado)}</span>
        ${c.estado !== 'cumplido' ? `<small class="cp-dias"><b>${dias}</b>${t('dias_sin')}</small>` : ''}</div>
    </div>`).join('');
  $('#listaGob').innerHTML = cs.map((c, i) => `<li><b>${String(i + 1).padStart(2, '0')}</b>${esc(Tx(c))}</li>`).join('');
  $('#listaCom').innerHTML = D.m.comerciantes.map((c, i) => `<li><b>${String(i + 1).padStart(2, '0')}</b>${esc(Tx(c))}</li>`).join('');
}

/* ---------- Obras y mapa satelital ---------- */
let mapa, capas = [];
function pintarObras() {
  if (!D.m) return;
  const os = D.m.obras;
  $('#listaObras').innerHTML = os.map((o, i) => `<button class="ob rv" data-i="${i}">
      <div class="ob-foto" style="background-image:url('${esc(o.imagen || sat(o.lat, o.lng, 0.004, 400, 400))}')"></div>
      <div class="ob-in"><span class="ob-est">${esc(Tx(o, 'estado_es', 'estado_en'))}</span>
        <h3>${esc(Tx(o))}</h3><p>${esc(Tx(o, 'texto_es', 'texto_en'))}</p>
        <a href="${esc(o.url)}" target="_blank" rel="noopener">${t('fuente')}: ${esc(o.fuente)}</a></div></button>`).join('');
  if (!window.L || !$('#mapaSat')) return;
  if (!mapa) {
    mapa = window.L.map('mapaSat', { scrollWheelZoom: false }).setView([7.99, -75.17], 12);
    window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 18, attribution: 'Imagen: Esri, Maxar, Earthstar Geographics' }).addTo(mapa);
    window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', { maxZoom: 18, opacity: .85 }).addTo(mapa);
  }
  capas.forEach(c => c.remove()); capas = [];
  os.forEach(o => {
    const c = window.L.circleMarker([o.lat, o.lng], { radius: 11, color: '#fff', weight: 3, fillColor: '#ffb703', fillOpacity: .9 })
      .addTo(mapa).bindTooltip(Tx(o), { className: 'etq-mapa', direction: 'top', offset: [0, -8] })
      .bindPopup(`<b>${esc(Tx(o))}</b><br>${esc(Tx(o, 'estado_es', 'estado_en'))}<br><a href="${esc(o.url)}" target="_blank" rel="noopener">${t('fuente')}: ${esc(o.fuente)}</a>`);
    capas.push(c);
  });
  setTimeout(() => mapa.invalidateSize(), 300);
}

/* ---------- Región líder ---------- */
const FOTOS_LIDER = [[7.9935, -75.1985, 0.006], [7.9870, -75.1960, 0.004], [7.9700, -75.2300, 0.02], [7.9840, -75.1990, 0.0035]];
function pintarLider() {
  if (!D.m) return;
  const fotosNot = todas().filter(n => n.imagen).map(n => n.imagen);
  $('#listaLider').innerHTML = D.m.lider.map((l, i) => {
    const [la, ln, d] = FOTOS_LIDER[i] || FOTOS_LIDER[0];
    const foto = i === 3 && fotosNot[1] ? fotosNot[1] : sat(la, ln, d, 700, 600);
    return `<div class="ld rv" style="background-image:url('${esc(foto)}')"><h3>${esc(Tx(l))}</h3><p>${esc(Tx(l, 'texto_es', 'texto_en'))}</p></div>`;
  }).join('');
}

/* ---------- Línea de tiempo ---------- */
function pintarLinea() {
  if (!D.m) return;
  $('#lineaT').innerHTML = D.m.linea.map(x => `<li class="rv"><time>${fechaCorta(x.f)}</time><p>${esc(Tx(x))}</p><a href="${esc(x.url)}" target="_blank" rel="noopener">${t('fuente')}</a></li>`).join('');
}

/* ---------- Videos ---------- */
function pintarVideos() {
  const vs = D.videos.items || [];
  if (!vs.length) {
    $('#reproductor').innerHTML = `<a class="btn-prim" href="https://www.youtube.com/results?search_query=${encodeURIComponent('Caucasia Antioquia')}" target="_blank" rel="noopener">${t('buscar_yt')}</a>`;
    $('#listaVideos').innerHTML = `<p class="intro">${t('sin_videos')}</p>`;
    return;
  }
  const poner = id => {
    $('#reproductor').innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
    document.querySelectorAll('.vd').forEach(v => v.classList.toggle('on', v.dataset.id === id));
  };
  $('#listaVideos').innerHTML = vs.slice(0, 12).map(v => `<button class="vd" data-id="${esc(v.id)}"><img src="https://i.ytimg.com/vi/${esc(v.id)}/mqdefault.jpg" alt="" loading="lazy"><div>${esc(v.titulo)}<small>${esc(v.canal)}${v.hace ? ' · ' + esc(v.hace) : ''}</small></div></button>`).join('');
  $('#listaVideos').onclick = e => { const b = e.target.closest('.vd'); if (b) poner(b.dataset.id); };
  if (!$('#reproductor iframe')) poner(vs[0].id);
}

/* ---------- Su voz ---------- */
function pintarVoz() {
  const sel = $('#selTema'), v = sel.value;
  sel.innerHTML = (D.m?.temas || []).map(x => `<option>${esc(Tx(x))}</option>`).join('') + `<option>${t('vo_otro')}</option>`;
  if (v) sel.value = v;
}

/* ---------- Derecho de petición ---------- */
const ENTIDADES = [
  ['Alcaldía de Caucasia — Despacho del Alcalde', 'contactenos@caucasia-antioquia.gov.co'],
  ['Secretaría de Hacienda y Tesorería', 'tesoreria@caucasia-antioquia.gov.co'],
  ['Secretaría de Planeación (obras)', 'planeacion@caucasia-antioquia.gov.co'],
  ['Secretaría de Gobierno (espacio público)', 'gobierno@caucasia-antioquia.gov.co'],
  ['Concejo Municipal de Caucasia', 'concejo@caucasia-antioquia.gov.co'],
  ['Personería Municipal de Caucasia', 'personeria@caucasia-antioquia.gov.co']
];
const ASUNTO = 'Derecho de petición — compromisos de la mesa de trabajo con comerciantes de Caucasia';
const datosForm = () => Object.fromEntries(new FormData($('#formPet')));
function textoPeticion() {
  const f = datosForm();
  const hoy = new Intl.DateTimeFormat('es-CO', { timeZone: TZ, day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
  const quien = `${f.nombre || '[Nombre completo]'}, identificado(a) con cédula de ciudadanía ${f.cc || '[Cédula]'}${f.negocio ? ', comerciante propietario(a) o representante de ' + f.negocio : ''}`;
  return `${f.ciudad || '[Ciudad]'}, ${hoy}

Señores
Alcaldía Municipal de Caucasia (Despacho del Alcalde, Secretaría de Hacienda, Secretaría de Planeación y Secretaría de Gobierno); Concejo Municipal de Caucasia; Personería Municipal de Caucasia.

Asunto: Derecho de petición de información sobre los compromisos de la mesa de trabajo realizada por la Administración Municipal con comerciantes y empresarios de Caucasia (noviembre de 2026).

Yo, ${quien}, en ejercicio del derecho fundamental de petición del artículo 23 de la Constitución Política y de la Ley 1755 de 2015, respetuosamente solicito la siguiente información, cada entidad dentro de su competencia:

1. Copia del acta, relatoría o ayuda de memoria de la mesa de trabajo que el alcalde y el secretario de Hacienda sostuvieron con más de 20 comerciantes y empresarios, publicada en las redes oficiales de la Alcaldía, con los sectores o gremios asistentes, las necesidades planteadas y los compromisos adquiridos, indicando para cada uno el responsable y la fecha de cumplimiento.

2. Fecha de la próxima mesa de seguimiento y el mecanismo público con el que se informará el avance de esos compromisos.

3. Obras en la vía, en especial la pavimentación de la carrera primera: número del proceso en SECOP, valor, contratista, interventoría, fecha de inicio, fecha prevista de entrega, porcentaje de avance y el plan de manejo de tránsito, accesos y horarios de cargue y descargue para los establecimientos comerciales afectados.

4. Espacio público: el plan de recuperación con sus zonas y cronograma, si existe censo o caracterización de vendedores informales y cuáles son las alternativas de reubicación o formalización previstas antes de cualquier operativo.

5. Alumbrado público: inventario de luminarias del área urbana, cuántas son LED, cuántos puntos están apagados y en qué plazo se repararán; quién opera el servicio y bajo qué contrato; cuánto se recaudó por el impuesto de alumbrado público en 2025 y en 2026 a la fecha y en qué se invirtió; y el plan para las zonas comerciales.

6. Panorama tributario: si la Administración prepara o ya radicó ante el Concejo algún proyecto de acuerdo que modifique el estatuto tributario o las tarifas de industria y comercio, avisos y tableros o predial para la vigencia 2027; el cronograma de socialización con el comercio; y si se contemplan alivios o incentivos para los negocios afectados por las obras o por el paro minero de 2026.

7. Recaudo del impuesto de industria y comercio en 2025 y en 2026 a la fecha, y los principales proyectos financiados con esos recursos.

Al Concejo Municipal le solicito informar los proyectos de acuerdo en materia tributaria o presupuestal en trámite que afecten al comercio, y a la Personería Municipal, en su función de veeduría del cumplimiento de los deberes de la administración, acompañar el seguimiento de esta petición.

Si alguna entidad no es competente para responder alguno de los puntos, le solicito darle traslado a la entidad competente e informarme, según el artículo 21 de la Ley 1755 de 2015.

Recibiré respuesta en el correo electrónico ${f.correo || '[correo]'}${f.tel ? ' y en el celular ' + f.tel : ''}.

Atentamente,

${f.nombre || '[Nombre completo]'}
C.C. ${f.cc || '[Cédula]'}
${f.negocio ? f.negocio + '\n' : ''}${f.ciudad || '[Ciudad]'}`;
}
function pintarPeticion() {
  $('#destinos').innerHTML = ENTIDADES.map(([n, c]) => `<li>${esc(n)} — <span>${esc(c)}</span></li>`).join('');
  $('#petTexto').textContent = textoPeticion();
}

/* ---------- Todas las noticias ---------- */
let cuantas = 20;
function pintarTodas() {
  const ts = todas();
  $('#todas').innerHTML = ts.slice(0, cuantas).map(n => `<a class="lf" href="${esc(n.url)}" target="_blank" rel="noopener"><time>${fechaLarga(n.fecha)}</time><div><span>${esc(n.fuente)}</span><b>${esc(n.titulo)}</b></div></a>`).join('');
  $('#btnMas').style.display = ts.length > cuantas ? '' : 'none';
  const h = D.noticias.actualizado;
  $('#robotHora').textContent = h ? t('robot', { h: fechaLarga(h, true) }) : '';
}

/* ---------- Animaciones al bajar ---------- */
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('ya');
  io.unobserve(e.target);
}), { threshold: .12 }) : null;
function revelar() {
  document.querySelectorAll('.rv:not(.ya)').forEach(el => { if (io) io.observe(el); else el.classList.add('ya'); });
}

function pintarTodo() {
  aplicarIdioma(); pintarHero(); pintarCinta(); pintarRapidas(); pintarHoy(); pintarTemas(); pintarTablero();
  pintarObras(); pintarLider(); pintarLinea(); pintarVideos(); pintarVoz(); pintarPeticion(); pintarTodas(); revelar();
}

async function vivo(q) {
  const est = $('#estadoBusq');
  est.textContent = t('busc_cargando');
  try {
    const r = await buscarEnVivo(q);
    if (!r.length) throw new Error('vacio');
    enVivo = mezclar(enVivo, r);
    est.textContent = t('busc_ok', { n: r.length });
    if (q) {
      $('#hoyLista').innerHTML = mezclar(r).slice(0, 12).map((n, i) => tarjeta(n, i === 0)).join('');
      revelar();
    } else { pintarHoy(); pintarCinta(); pintarHero(); pintarTemas(); pintarLider(); pintarTodas(); revelar(); }
  } catch { est.textContent = t('busc_nada'); if (!q) pintarHoy(); }
}
function buscarDesde(q) {
  $('#q').value = q;
  $('#hoy').scrollIntoView({ behavior: 'smooth' });
  vivo(q);
}
async function actualizar() {
  const b = $('#btnActualizar');
  b.classList.add('cargando');
  await cargarTodo();
  pintarTodo(); animarCuentas();
  await vivo($('#q').value.trim());
  b.classList.remove('cargando');
}

/* ---------- Arranque ---------- */
document.addEventListener('DOMContentLoaded', async () => {
  aplicarIdioma();
  await cargarTodo();
  pintarTodo(); animarCuentas(); rotarHero();
  vivo('');  // búsqueda en vivo al abrir
  $('#btnActualizar').onclick = actualizar;
  $('#btnLang').onclick = () => { LANG = LANG === 'es' ? 'en' : 'es'; try { localStorage.setItem('mc_lang', LANG); } catch {} pintarTodo(); animarCuentas(); };
  $('#btnBuscar').onclick = () => vivo($('#q').value.trim());
  $('#q').addEventListener('keydown', e => { if (e.key === 'Enter') vivo($('#q').value.trim()); });
  $('#rapidas').addEventListener('click', e => { const b = e.target.closest('button'); if (b) buscarDesde(b.dataset.q); });
  $('#temas').addEventListener('click', e => { const b = e.target.closest('.tema-ver'); if (b) buscarDesde(b.dataset.q); });
  $('#listaObras').addEventListener('click', e => {
    if (e.target.closest('a')) return;
    const b = e.target.closest('.ob'); if (!b || !mapa) return;
    const o = D.m.obras[+b.dataset.i];
    document.querySelectorAll('.ob').forEach(x => x.classList.toggle('on', x === b));
    mapa.flyTo([o.lat, o.lng], 15, { duration: 1.2 });
    capas[+b.dataset.i]?.openPopup();
  });
  $('#btnMas').onclick = () => { cuantas += 20; pintarTodas(); };
  $('#formVoz').addEventListener('submit', e => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    const msg = `Mesa del Comercio al Día — Caucasia\n\nNegocio y barrio: ${f.negocio}\nTema: ${f.tema}\n\nLo que me está pasando: ${f.problema}\n\nMi propuesta: ${f.propuesta || '—'}`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
  });
  $('#formPet').addEventListener('input', () => $('#petTexto').textContent = textoPeticion());
  $('#formPet').addEventListener('submit', e => {
    e.preventDefault();
    const to = ENTIDADES.map(x => x[1]).join(',');
    location.href = `mailto:${to}?subject=${encodeURIComponent(ASUNTO)}&body=${encodeURIComponent(textoPeticion())}`;
  });
  $('#btnGmail').onclick = () => {
    if (!$('#formPet').reportValidity()) return;
    const to = ENTIDADES.map(x => x[1]).join(',');
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(ASUNTO)}&body=${encodeURIComponent(textoPeticion())}`, '_blank');
  };
  $('#btnCopiar').onclick = async () => {
    try { await navigator.clipboard.writeText(textoPeticion()); $('#btnCopiar').textContent = t('copiado'); setTimeout(() => $('#btnCopiar').textContent = t('pe_copiar'), 2000); } catch {}
  };
  $('#btnCompartir').onclick = () => window.open(`https://wa.me/?text=${encodeURIComponent(t('compartir_txt') + ' ' + URL_APP)}`, '_blank');
  // Al volver a la app, se refresca sola
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') actualizar(); });
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
});
