/* Posada del Fundador · Renderizador del sitio
 * Lee config.json y arma toda la página. El panel (admin.html) edita ese archivo.
 * No hace falta tocar este archivo para cambiar textos, fotos, colores o fuentes. */
(function () {
'use strict';
var PF = window.PF = window.PF || {};

/* ───────── Iconos (contenido interno de un svg 24×24, trazo) ───────── */
var ICONS = {
  casa:'<path d="M3 20 12 4l9 16z"/><path d="M9 20v-5h6v5"/>',
  agua:'<path d="M3 9c2 0 2-1.5 4.5-1.5S10 9 12 9s2.5-1.5 4.5-1.5S19 9 21 9"/><path d="M3 14c2 0 2-1.5 4.5-1.5S10 14 12 14s2.5-1.5 4.5-1.5S19 14 21 14"/><path d="M3 19c2 0 2-1.5 4.5-1.5S10 19 12 19s2.5-1.5 4.5-1.5S19 19 21 19"/>',
  fuego:'<path d="M12 3c1 3.5 4.5 5 4.5 9a4.5 4.5 0 0 1-9 0c0-2 1-3.5 2-4.5 0 2 1 2.5 2 2.5 0-2.5-1-4.5.5-7z"/><path d="M5 21h14"/>',
  montana:'<path d="M2 20 9 7l4 7 3-4 6 10z"/>',
  auto:'<path d="M4 16v-4l2-5h12l2 5v4z"/><path d="M4 16h16"/><path d="M7 19v-3"/><path d="M17 19v-3"/>',
  planta:'<path d="M12 21v-6"/><path d="M12 15c-4 0-6-3-5-6 0-3 3-5 5-5s5 2 5 5c1 3-1 6-5 6z"/>',
  piscina:'<path d="M8 13V6a2 2 0 0 1 4 0M14 13V6a2 2 0 0 1 4 0"/><path d="M3 16c2 0 2-1.5 4.5-1.5S10 16 12 16s2.5-1.5 4.5-1.5S19 16 21 16"/><path d="M3 20.5c2 0 2-1.5 4.5-1.5S10 20.5 12 20.5s2.5-1.5 4.5-1.5S19 20.5 21 20.5"/>',
  hoja:'<path d="M12 21v-8"/><path d="M12 13c-4 0-6.5-2.5-6.5-6.5 4 0 6.5 2.5 6.5 6.5z"/><path d="M12 11c0-3.5 2-5.5 6.5-5.5 0 4-2.5 5.5-6.5 5.5z"/>',
  grid:'<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
  sol:'<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>',
  corazon:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  estrella:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  personas:'<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><path d="M16 5.2a3 3 0 0 1 0 5.6M18 14.3c1.8.8 3 2.7 3 5.7"/>',
  camara:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  musica:'<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
  wifi:'<path d="M3 9a14 14 0 0 1 18 0M6 12.5a9.5 9.5 0 0 1 12 0M9 16a5 5 0 0 1 6 0"/><path d="M12 19.5v.01"/>',
  mascota:'<circle cx="7" cy="9" r="1.8"/><circle cx="12" cy="6.5" r="1.8"/><circle cx="17" cy="9" r="1.8"/><path d="M12 12c-3 0-5 2.5-5 5 0 2 2 2.5 5 1.5 3 1 5 .5 5-1.5 0-2.5-2-5-5-5z"/>',
  cama:'<path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="1.5"/>',
  llave:'<circle cx="8" cy="15" r="4"/><path d="M11 12 20 3M16 7l3 3"/>'
};
var SOCIAL_ICONS = {
  facebook:'<path d="M7 10v4h3v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1h3V3h-3a5 5 0 0 0-5 5v2H7"/>',
  instagram:'<rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3"/><path d="M16.5 7.5v.01"/>',
  tiktok:'<path d="M21 7.917v4.034a9.948 9.948 0 0 1-5-1.951v4.5a6.5 6.5 0 1 1-8-6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z"/>',
  youtube:'<rect x="3" y="6" width="18" height="12" rx="4"/><path d="m10.5 9.5 4 2.5-4 2.5z"/>',
  x:'<path d="M5 4l14 16M19 4 5 20"/>',
  enlace:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'
};
var WA_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z';
var WA_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + WA_PATH + '"/></svg>';
var PIN_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-6.1-6.5-11A6.5 6.5 0 0 1 12 3.5 6.5 6.5 0 0 1 18.5 10c0 4.9-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/></svg>';
function svg(inner) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + inner + '</svg>'; }

/* ───────── Secciones, fuentes y paletas ───────── */
var SECTIONS = [
  { id: 'hero',     label: 'Portada',                anchor: 'inicio' },
  { id: 'intro',    label: 'Presentación y datos',   anchor: 'intro' },
  { id: 'why',      label: 'Razones para visitarnos',anchor: 'razones' },
  { id: 'gallery',  label: 'Galería de espacios',    anchor: 'espacios' },
  { id: 'packs',    label: 'Experiencias',           anchor: 'alquiler' },
  { id: 'events',   label: 'Momentos inolvidables',  anchor: 'eventos' },
  { id: 'faq',      label: 'Preguntas frecuentes',   anchor: 'faq' },
  { id: 'location', label: 'Ubicación y condiciones',anchor: 'llegar' },
  { id: 'contact',  label: 'Fechas y precios',       anchor: 'consulta' }
];
var ANCHORS = SECTIONS.map(function (s) { return { value: s.anchor, label: s.label, section: s.id }; });
ANCHORS.push({ value: 'condiciones', label: 'Condiciones de reserva', section: 'location' });

var FONTS = {
  heading: {
    'Playfair Display':   { spec: 'ital,wght@0,500;0,600;1,500', fb: 'serif' },
    'Cormorant Garamond': { spec: 'ital,wght@0,500;0,600;1,500', fb: 'serif' },
    'DM Serif Display':   { spec: '', fb: 'serif' },
    'Lora':               { spec: 'wght@500;600', fb: 'serif' },
    'Fraunces':           { spec: 'wght@500;600', fb: 'serif' },
    'Libre Baskerville':  { spec: 'wght@400;700', fb: 'serif' }
  },
  script: {
    'Great Vibes':     { spec: '', fb: 'cursive' },
    'Pinyon Script':   { spec: '', fb: 'cursive' },
    'Dancing Script':  { spec: 'wght@400;500', fb: 'cursive' },
    'Satisfy':         { spec: '', fb: 'cursive' },
    'Allura':          { spec: '', fb: 'cursive' },
    'Parisienne':      { spec: '', fb: 'cursive' }
  },
  body: {
    'Jost':        { spec: 'wght@300;400;500', fb: 'system-ui,sans-serif' },
    'Montserrat':  { spec: 'wght@300;400;500', fb: 'system-ui,sans-serif' },
    'DM Sans':     { spec: 'wght@300;400;500', fb: 'system-ui,sans-serif' },
    'Nunito Sans': { spec: 'wght@300;400;600', fb: 'system-ui,sans-serif' },
    'Work Sans':   { spec: 'wght@300;400;500', fb: 'system-ui,sans-serif' },
    'Lato':        { spec: 'wght@300;400;700', fb: 'system-ui,sans-serif' },
    'Inter':       { spec: 'wght@300;400;500', fb: 'system-ui,sans-serif' }
  }
};
var FONT_PRESETS = {
  clasico:  { label: 'Clásico',  heading: 'Playfair Display',   script: 'Great Vibes',    body: 'Jost' },
  elegante: { label: 'Elegante', heading: 'Cormorant Garamond', script: 'Pinyon Script',  body: 'Montserrat' },
  moderno:  { label: 'Moderno',  heading: 'DM Serif Display',   script: 'Dancing Script', body: 'DM Sans' },
  rustico:  { label: 'Rústico',  heading: 'Lora',               script: 'Satisfy',        body: 'Work Sans' }
};
var PALETTES = {
  dorado:  { label: 'Dorado nocturno', mode: 'dark',  colors: { ink:'#0c0d10', panel:'#15171c', line:'#2a2c33', gold:'#c8a24a', gold2:'#e6cf94', cream:'#f1e8d3', mute:'#a9a597', onGold:'#17130a' } },
  bosque:  { label: 'Bosque',          mode: 'dark',  colors: { ink:'#0d1410', panel:'#141d18', line:'#25332b', gold:'#8fb573', gold2:'#c5dfae', cream:'#eef1e6', mute:'#a3ad9d', onGold:'#0d1410' } },
  atardecer:{label: 'Atardecer',       mode: 'dark',  colors: { ink:'#14100f', panel:'#1d1614', line:'#382a26', gold:'#d9824f', gold2:'#f0b48a', cream:'#f6e9df', mute:'#b3a39a', onGold:'#1a0f08' } },
  oceano:  { label: 'Océano',          mode: 'dark',  colors: { ink:'#0a1218', panel:'#111c25', line:'#223340', gold:'#5fb4c9', gold2:'#a7dbe8', cream:'#e9f1f4', mute:'#9bb0ba', onGold:'#06141a' } },
  vino:    { label: 'Vino',            mode: 'dark',  colors: { ink:'#130b0e', panel:'#1c1216', line:'#35222a', gold:'#cf8a9c', gold2:'#ecc0cb', cream:'#f6e8ec', mute:'#b39ea5', onGold:'#1b0c11' } },
  crema:   { label: 'Crema claro',     mode: 'light', colors: { ink:'#f7f1e3', panel:'#efe6d0', line:'#d9ccb0', gold:'#9a6b1f', gold2:'#7a5214', cream:'#2a2118', mute:'#6d6250', onGold:'#ffffff' } }
};
var BTN_RADIUS = { pill: '999px', rounded: '14px', square: '2px' };

/* ───────── Utilidades ───────── */
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
function fmt(s) { return esc(s).replace(/\*([^*]+)\*/g, '<b>$1</b>'); }   // *negrita*
function arr(x) { return Array.isArray(x) ? x : []; }
function hexRgb(h) {
  h = String(h || '').replace('#', '');
  if (h.length === 3) h = h.replace(/./g, '$&$&');
  var n = parseInt(h, 16);
  if (isNaN(n) || h.length !== 6) return '0,0,0';
  return ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255);
}
function waUrl(c, text) {
  var num = String((c.site && c.site.whatsapp) || '').replace(/\D/g, '');
  return 'https://wa.me/' + num + '?text=' + encodeURIComponent(text || (c.site && c.site.hello) || '');
}
function sectionAnchor(id) { for (var i = 0; i < SECTIONS.length; i++) if (SECTIONS[i].id === id) return SECTIONS[i].anchor; return id; }

/* ───────── Tema: colores, fuentes, formas ───────── */
function fontFamily(role, name) {
  var f = (FONTS[role] || {})[name]; if (!f) return null;
  return "'" + name + "'," + (role === 'heading' ? "'Cormorant Garamond',Georgia,serif" : role === 'script' ? "'Snell Roundhand',cursive" : 'system-ui,sans-serif');
}
function fontsHref(fonts) {
  var parts = [];
  ['heading', 'script', 'body'].forEach(function (role) {
    var name = fonts[role], f = (FONTS[role] || {})[name]; if (!f) return;
    parts.push('family=' + name.replace(/ /g, '+') + (f.spec ? ':' + f.spec : ''));
  });
  return 'https://fonts.googleapis.com/css2?' + parts.join('&') + '&display=swap';
}
var DEFAULT_FONTS = { heading: 'Playfair Display', script: 'Great Vibes', body: 'Jost' };
function applyTheme(c) {
  var t = c.theme || {}, col = t.colors || {}, root = document.documentElement, st = root.style;
  var set = function (k, v) { st.setProperty(k, v); };
  ['ink', 'panel', 'line', 'gold', 'gold2', 'cream', 'mute'].forEach(function (k) { if (col[k]) set('--' + k, col[k]); });
  if (col.onGold) set('--on-gold', col.onGold);
  set('--ink-rgb', hexRgb(col.ink)); set('--gold-rgb', hexRgb(col.gold));
  set('--gold2-rgb', hexRgb(col.gold2)); set('--cream-rgb', hexRgb(col.cream));
  root.setAttribute('data-mode', t.mode === 'light' ? 'light' : 'dark');
  set('color-scheme', t.mode === 'light' ? 'light' : 'dark');
  set('--fs', (t.baseSize || 17) + 'px');
  set('--radius', (t.radius == null ? 8 : t.radius) + 'px');
  set('--btn-r', BTN_RADIUS[t.buttons] || BTN_RADIUS.pill);
  set('--dim', String((t.heroDim == null ? 100 : t.heroDim) / 100));
  var f = t.fonts || DEFAULT_FONTS, ff;
  if ((ff = fontFamily('heading', f.heading))) set('--serif', ff);
  if ((ff = fontFamily('script', f.script))) set('--script', ff);
  if ((ff = fontFamily('body', f.body))) set('--sans', ff);
  var isDefault = f.heading === DEFAULT_FONTS.heading && f.script === DEFAULT_FONTS.script && f.body === DEFAULT_FONTS.body;
  var link = document.getElementById('pf-fonts');
  if (!isDefault) {
    if (!link) { link = document.createElement('link'); link.id = 'pf-fonts'; link.rel = 'stylesheet'; document.head.appendChild(link); }
    var href = fontsHref(f); if (link.getAttribute('href') !== href) link.setAttribute('href', href);
  } else if (link) { link.remove(); }
  var tc = document.querySelector('meta[name="theme-color"]'); if (tc && col.ink) tc.setAttribute('content', col.ink);
  document.body.style.background = col.ink || '';
}
function applyMeta(c) {
  var s = c.site || {};
  if (s.title) document.title = s.title;
  var d = document.querySelector('meta[name="description"]'); if (d && s.description) d.setAttribute('content', s.description);
  var fav = document.querySelector('link[rel="icon"]');
  if (fav && !PF.preview) fav.setAttribute('href', 'favicon.png');
}

/* ───────── Plantillas HTML de cada sección ───────── */
function btn(c, b, extra) {
  var cls = 'btn' + (b.style === 'ghost' ? ' ghost' : '') + (extra ? ' ' + extra : '');
  var ic = b.icon ? WA_SVG : '';
  if (b.action === 'section') return '<a class="' + cls + '" href="#' + esc(b.target || 'inicio') + '">' + ic + esc(b.label) + '</a>';
  if (b.action === 'url') return '<a class="' + cls + '" href="' + esc(b.target || '#') + '" target="_blank" rel="noopener">' + ic + esc(b.label) + '</a>';
  return '<a class="' + cls + '" href="' + esc(waUrl(c, b.msg)) + '" target="_blank" rel="noopener">' + ic + esc(b.label) + '</a>';
}
function socialLinks(c, brand) {
  return arr(c.footer && c.footer.socials).filter(function (s) { return s.url; }).map(function (s) {
    return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener" aria-label="' + esc(s.name + ' de ' + brand) + '" title="' + esc(s.name) + '">' + svg(SOCIAL_ICONS[s.icon] || SOCIAL_ICONS.enlace) + '</a>';
  }).join('');
}

var R = {};
R.header = function (c, visible) {
  var brand = esc(c.site.brand);
  var vis = {}; visible.forEach(function (s) { vis[s.id] = 1; });
  var items = arr(c.menu).filter(function (m) {
    var a = ANCHORS.filter(function (x) { return x.value === m.target; })[0];
    return !a || vis[a.section];
  }).map(function (m) { return '<a href="#' + esc(m.target) + '">' + esc(m.label) + '</a>'; }).join('');
  return '<header><div class="wrap"><a class="brand" href="#inicio">' + brand + '</a>' +
    '<button class="menu-btn" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="menu"><span class="bars" aria-hidden="true"><i></i><i></i><i></i></span></button></div>' +
    '<nav class="menu" id="menu" aria-label="Secciones de la página"><div class="wrap">' + items +
    '<div class="social msocial" role="group" aria-label="Redes sociales">' + socialLinks(c, c.site.brand) + '</div></div></nav></header>';
};
R.hero = function (c) {
  var h = c.hero, im = arr(h.images).filter(function (m) { return m && m.src; });
  var first = im[0] || { src: '', x: 50, y: 50 };
  var slides = im.map(function (m, i) {
    var p = (m.x == null ? 50 : m.x) + '% ' + (m.y == null ? 50 : m.y) + '%';
    return i === 0 ? '<div class="hs s0 on" style="--p:' + p + '"></div>'
                   : '<div class="hs" style="--bg:url(' + esc(m.src) + ');--p:' + p + '"></div>';
  }).join('');
  return '<section class="hero" id="inicio" style="--hm:url(' + esc(first.src) + ');--hd:var(--hm)">' +
    '<div class="hbg" aria-hidden="true">' + slides + '</div><div class="hdots" role="group" aria-label="Fotos de la portada"></div>' +
    '<div class="wrap"><div class="hk">' + esc(h.kicker) + '</div><h1>' + esc(h.title) + '</h1><p>' + esc(h.text) + '</p>' +
    '<div class="hbtns">' + arr(h.buttons).map(function (b) { return btn(c, b); }).join('') + '</div></div></section>';
};
R.intro = function (c) {
  var i = c.intro;
  return '<section class="wrap intro" id="intro"><h2>' + esc(i.title) + '</h2><p>' + esc(i.text) + '</p><ul class="facts">' +
    arr(i.facts).map(function (f) { return '<li><b>' + esc(f.value) + '</b><span>' + esc(f.label) + '</span></li>'; }).join('') + '</ul></section>';
};
R.why = function (c) {
  var w = c.why;
  return '<section class="wrap why" id="razones"><h2>' + esc(w.title) + '</h2><div class="wg">' +
    arr(w.items).map(function (it) {
      return '<div class="wi">' + svg(ICONS[it.icon] || ICONS.estrella) + '<h3>' + esc(it.title) + '</h3><p>' + esc(it.text) + '</p></div>';
    }).join('') + '</div></section>';
};
R.gallery = function (c) {
  var g = c.gallery, cats = arr(g.categories);
  var chips = cats.map(function (k, i) {
    return '<button data-c="' + esc(k.id) + '" aria-pressed="' + (i === 0) + '">' + svg(ICONS[k.icon] || ICONS.grid) + esc(k.label) + '</button>';
  }).join('');
  var slides = arr(g.slides).filter(function (s) { return s && s.img; }).map(function (s) {
    return '<figure class="slide" data-cat="' + esc(s.cat) + '"><img src="' + esc(s.img) + '" alt="' + esc(s.alt) + '" draggable="false"><figcaption><b>' + esc(s.title) + '</b>' + esc(s.text) + '</figcaption></figure>';
  }).join('');
  var arrow = function (d) { return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + d + '"/></svg>'; };
  var P = arrow('M15 5l-7 7 7 7'), N = arrow('M9 5l7 7-7 7');
  return '<section class="wrap gal" id="espacios"><h2>' + esc(g.title) + '</h2><p class="sub">' + esc(g.sub) + '</p>' +
    '<div class="chips" role="group" aria-label="Filtrar espacios">' + chips + '</div>' +
    '<div class="stage" id="stage" tabindex="0" role="region" aria-roledescription="carrusel" aria-label="Fotos de ' + esc(c.site.brand) + '">' + slides +
    '<span class="count" id="count"></span><button class="nav p" aria-label="Foto anterior">' + P + '</button><button class="nav n" aria-label="Foto siguiente">' + N + '</button><div class="bar"><i></i></div></div>' +
    '<div class="thumbs" id="thumbs"></div>' +
    '<dialog id="lb" aria-label="Foto ampliada"><img alt=""><p id="lbt"></p><button class="nav x" aria-label="Cerrar">' + arrow('M6 6l12 12M18 6L6 18') + '</button>' +
    '<button class="nav p" aria-label="Foto anterior">' + P + '</button><button class="nav n" aria-label="Foto siguiente">' + N + '</button></dialog></section>';
};
R.packs = function (c) {
  var p = c.packs;
  return '<section class="wrap packs" id="alquiler"><h2>' + esc(p.title) + '</h2>' + (p.sub ? '<p class="sub">' + esc(p.sub) + '</p>' : '') + '<div class="pg">' +
    arr(p.items).map(function (it, i) {
      return '<article class="pk" data-i="' + i + '"><div class="pi"><img src="' + esc(it.img) + '" alt="' + esc(it.alt) + '" loading="lazy"></div><div class="pt"><h3>' + esc(it.title) + '</h3><p>' + esc(it.text) + '</p>' +
        '<a class="btn sm" href="' + esc(waUrl(c, it.msg)) + '" target="_blank" rel="noopener">' + esc(it.button) + '</a></div></article>';
    }).join('') + '</div></section>';
};
R.events = function (c) {
  var e = c.events;
  return '<section class="wrap ev" id="eventos"><h2>' + esc(e.title) + '</h2><p class="sub">' + esc(e.sub) + '</p><div class="evg">' +
    arr(e.items).map(function (it, i) {
      return '<figure class="' + (i < 4 ? 'e' + (i + 1) : '') + '" data-i="' + i + '"><img src="' + esc(it.img) + '" alt="' + esc(it.alt) + '" loading="lazy"><figcaption><b>' + esc(it.title) + '</b>' + esc(it.text) + '</figcaption></figure>';
    }).join('') + '</div><ul class="evf">' + arr(e.features).map(function (f) { return '<li>' + fmt(f) + '</li>'; }).join('') + '</ul>' +
    '<a class="btn" href="' + esc(waUrl(c, e.msg)) + '" target="_blank" rel="noopener">' + esc(e.button) + '</a></section>';
};
R.faq = function (c) {
  var f = c.faq;
  return '<section class="wrap faq" id="faq"><h2>' + esc(f.title) + '</h2><div class="fq">' +
    arr(f.items).map(function (d) { return '<details><summary>' + esc(d.q) + '</summary><p>' + esc(d.a) + '</p></details>'; }).join('') + '</div></section>';
};
R.location = function (c) {
  var l = c.location, ll = encodeURIComponent(String(l.lat).trim()) + ',' + encodeURIComponent(String(l.lng).trim());
  return '<section class="wrap llegar" id="llegar"><div class="lg-map"><h2>' + esc(l.mapTitle) + '</h2><p class="sub">' + esc(l.mapSub) + '</p>' +
    '<div class="mapbox"><iframe title="Ubicación de ' + esc(c.site.brand) + ' en Google Maps" src="https://www.google.com/maps?q=' + ll + '&z=16&hl=es&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>' +
    '<div class="lg-btns"><a class="btn" href="' + esc(l.mapsUrl || ('https://www.google.com/maps?q=' + ll)) + '" target="_blank" rel="noopener">' + PIN_SVG + esc(l.btn1) + '</a>' +
    '<a class="btn ghost" href="https://www.google.com/maps/dir/?api=1&destination=' + ll + '" target="_blank" rel="noopener">' + esc(l.btn2) + '</a></div></div>' +
    '<div class="lg-cond" id="condiciones"><h2>' + esc(l.condTitle) + '</h2><p class="sub">' + esc(l.condSub) + '</p><div class="fq">' +
    arr(l.conditions).map(function (d) { return '<details><summary>' + esc(d.title) + '</summary><ul>' + arr(d.points).map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul></details>'; }).join('') +
    '</div><a class="btn sm" href="' + esc(waUrl(c, l.condMsg)) + '" target="_blank" rel="noopener">' + esc(l.condButton) + '</a></div></section>';
};
R.contact = function (c) {
  var k = c.contact;
  return '<section class="contact" id="consulta"><div class="wrap"><div><h2>' + esc(k.title) + '</h2><p>' + esc(k.text) + '</p><form id="f">' +
    '<label>' + esc(k.lblIn) + '<input type="date" name="in"></label><label>' + esc(k.lblOut) + '<input type="date" name="out"></label>' +
    '<label>' + esc(k.lblPeople) + '<input type="number" name="n" min="1" max="100" inputmode="numeric" placeholder="' + esc(k.phPeople) + '"></label>' +
    '<label>' + esc(k.lblMotive) + '<select name="m">' + arr(k.motives).map(function (o) { return '<option>' + esc(o) + '</option>'; }).join('') + '</select></label>' +
    '<label class="full">' + esc(k.lblName) + '<input type="text" name="nm" autocomplete="name" placeholder="' + esc(k.phName) + '"></label>' +
    '<button class="btn" type="submit">' + WA_SVG + esc(k.submit) + '</button><p class="note">' + esc(k.note) + '</p></form></div>' +
    (k.logo ? '<img class="logo" src="' + esc(k.logo) + '" alt="' + esc(k.logoAlt) + '">' : '') + '</div></section>';
};
R.footer = function (c) {
  var f = c.footer;
  return '<footer><div class="wrap"><em>' + esc(f.tagline) + '</em><div class="social" role="group" aria-label="Redes sociales">' + socialLinks(c, c.site.brand) + '</div>' +
    '<span class="fsoc">' + esc(f.socialLabel) + '</span>' + esc(f.text) + '</div></footer>';
};
R.modal = function (c) {
  return '<dialog id="xp" aria-labelledby="xt"><div class="xi"><img alt=""></div><button class="xx" type="button" aria-label="Cerrar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
    '<div class="xb"><span class="xk" id="xk"></span><h3 id="xt"></h3><p id="xp-t"></p><a class="btn" id="xa" href="#consulta" target="_blank" rel="noopener">' + WA_SVG + esc(c.site.modalButton || 'Escríbenos por WhatsApp') + '</a></div></dialog>';
};

function renderHTML(c) {
  var secs = arr(c.sections).filter(function (s) { return s.visible !== false && R[s.id]; });
  var html = R.header(c, secs);   // el menú solo muestra enlaces a secciones visibles
  html += '<main>' + secs.map(function (s) { return R[s.id](c); }).join('\n') + '</main>';
  html += R.footer(c);
  if (c.site.floatingWhatsapp !== false) html += '<a class="fab" href="' + esc(waUrl(c, c.site.hello)) + '" target="_blank" rel="noopener" aria-label="Escribir por WhatsApp">' + WA_SVG + '</a>';
  html += R.modal(c);
  return html;
}

/* ───────── Comportamiento (galería, portada, menú, ventanas, formulario) ───────── */
var teardown = [];
function cleanup() { teardown.splice(0).forEach(function (f) { try { f(); } catch (e) {} }); }
function on(target, ev, fn, opts) { target.addEventListener(ev, fn, opts); teardown.push(function () { target.removeEventListener(ev, fn, opts); }); }
var RM = (typeof window !== 'undefined' && window.matchMedia) ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

function initHero() {
  var sl = [].slice.call(document.querySelectorAll('.hs')), dots = document.querySelector('.hdots'), hero = document.querySelector('.hero');
  if (!sl.length || !dots) return;
  var cur = 0, t, vis = true;
  function go(i, m) { sl[cur].classList.remove('on'); cur = i; sl[cur].classList.add('on'); [].forEach.call(dots.children, function (b, k) { b.setAttribute('aria-current', k === cur); }); if (m) restart(); }
  function restart() { clearInterval(t); if (!RM && vis && sl.length > 1) t = setInterval(function () { go((cur + 1) % sl.length); }, 6000); }
  if (sl.length > 1) sl.forEach(function (s, i) { var b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Foto ' + (i + 1)); b.onclick = function () { go(i, true); }; dots.appendChild(b); });
  go(0);
  teardown.push(function () { clearInterval(t); });
  if ('IntersectionObserver' in window) { var io = new IntersectionObserver(function (e) { vis = e[0].isIntersecting; restart(); }); io.observe(hero); teardown.push(function () { io.disconnect(); }); } else restart();
}

function initMenu() {
  var b = document.querySelector('.menu-btn'), m = document.getElementById('menu'); if (!b || !m) return;
  function set(o) { m.classList.toggle('open', o); b.setAttribute('aria-expanded', o); b.setAttribute('aria-label', o ? 'Cerrar menú' : 'Abrir menú'); }
  b.addEventListener('click', function (e) { e.stopPropagation(); set(!m.classList.contains('open')); });
  m.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
  on(document, 'click', function (e) { if (!e.target.closest('header')) set(false); });
  on(document, 'keydown', function (e) { if (e.key === 'Escape') set(false); });
}

function initGallery() {
  var st = document.getElementById('stage'); if (!st) return;
  var all = [].slice.call(st.querySelectorAll('.slide')), list = all.slice(), cur = -1,
    th = document.getElementById('thumbs'), cnt = document.getElementById('count'), bar = st.querySelector('.bar i'),
    lb = document.getElementById('lb'), lbi = lb.querySelector('img'), lbt = document.getElementById('lbt'),
    vis = false, held = false, over = false;
  if (!all.length) { st.style.display = 'none'; return; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function upd() { st.classList.toggle('paused', !vis || held || over || lb.open); }
  function restart() { bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = ''; }
  function syncLb() { var s = list[cur], im = s.querySelector('img'); lbi.src = im.src; lbi.alt = im.alt; lbt.textContent = s.querySelector('b').textContent; lbi.style.animation = 'none'; void lbi.offsetWidth; lbi.style.animation = ''; }
  function go(d, idx) {
    if (!list.length) return;
    var n = idx != null ? idx : (cur + d + list.length) % list.length; if (n === cur) return;
    var old = list[cur], nw = list[n], dir = idx != null ? (n > cur ? 1 : -1) : d;
    all.forEach(function (s) { s.classList.remove('prev'); });
    if (old) { old.classList.remove('on'); old.classList.add('prev'); }
    nw.classList.add('on');
    if (old && !RM && nw.animate) { nw.animate([{ clipPath: dir > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }, { clipPath: 'inset(0)' }], { duration: 950, easing: 'cubic-bezier(.77,0,.18,1)' }).onfinish = function () { old.classList.remove('prev'); }; }
    else if (old) { old.classList.remove('prev'); }
    cur = n; cnt.textContent = pad(n + 1) + ' / ' + pad(list.length);
    [].forEach.call(th.children, function (b, i) { b.setAttribute('aria-current', i === n); });
    var a = th.children[n]; if (a) th.scrollTo({ left: a.offsetLeft - th.clientWidth / 2 + a.offsetWidth / 2, behavior: RM ? 'auto' : 'smooth' });
    restart(); if (lb.open) syncLb();
  }
  function build(c) {
    list = all.filter(function (s) { s.classList.remove('on', 'prev'); return c === 'todo' || s.dataset.cat === c; });
    th.innerHTML = '';
    list.forEach(function (s, i) { var b = document.createElement('button'), im = document.createElement('img'); im.src = s.querySelector('img').src; im.alt = ''; b.appendChild(im); b.setAttribute('aria-label', 'Ver ' + s.querySelector('b').textContent); b.onclick = function () { go(0, i); }; th.appendChild(b); });
    cur = -1; if (list.length) go(0, 0); else cnt.textContent = '';
  }
  function openLb() { syncLb(); lb.showModal(); upd(); }
  var firstCat = (document.querySelector('.chips button') || {}).dataset;
  document.querySelectorAll('.chips button').forEach(function (b) { b.onclick = function () { document.querySelectorAll('.chips button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); build(b.dataset.c); }; });
  document.querySelectorAll('.nav.p').forEach(function (b) { b.onclick = function (e) { e.stopPropagation(); go(-1); }; });
  document.querySelectorAll('.nav.n').forEach(function (b) { b.onclick = function (e) { e.stopPropagation(); go(1); }; });
  lb.querySelector('.x').onclick = function () { lb.close(); }; lbi.onclick = function () { lb.close(); }; lb.addEventListener('close', upd);
  var sx = null;
  st.addEventListener('pointerdown', function (e) { if (e.target.closest('.nav')) return; sx = e.clientX; held = true; upd(); });
  st.addEventListener('pointerup', function (e) { if (sx == null) return; var dx = e.clientX - sx; sx = null; held = false; upd(); if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); else openLb(); });
  st.addEventListener('pointercancel', function () { sx = null; held = false; upd(); });
  st.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { over = true; upd(); } });
  st.addEventListener('pointerleave', function () { over = false; upd(); });
  on(document, 'keydown', function (e) {
    var inSt = st.contains(document.activeElement); if (!lb.open && !inSt) return;
    if (e.key === 'ArrowRight') go(1); else if (e.key === 'ArrowLeft') go(-1); else if (e.key === 'Enter' && !lb.open && document.activeElement === st) openLb();
  });
  bar.addEventListener('animationend', function () { go(1); });
  build(firstCat && firstCat.c ? firstCat.c : 'todo');
  if (!RM) st.classList.add('playing');
  if ('IntersectionObserver' in window) { var io = new IntersectionObserver(function (en) { vis = en[0].isIntersecting; upd(); }, { threshold: .4 }); io.observe(st); teardown.push(function () { io.disconnect(); }); } else { vis = true; }
  upd();
}

function initModal(c) {
  var d = document.getElementById('xp'); if (!d) return;
  var im = d.querySelector('.xi img'), k = document.getElementById('xk'), t = document.getElementById('xt'), p = document.getElementById('xp-t'), a = document.getElementById('xa');
  function show(src, alt, key, title, text, msg) {
    im.src = src; im.alt = alt || key; k.textContent = key; t.textContent = title || key; p.textContent = text || ''; p.hidden = !text;
    a.href = waUrl(c, msg); d.showModal(); d.scrollTop = 0;
  }
  function wire(el, fn) {
    var box = el.querySelector('.pi') || el;
    box.setAttribute('role', 'button'); box.tabIndex = 0;
    box.addEventListener('click', fn);
    box.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(); } });
  }
  [].forEach.call(document.querySelectorAll('.pk'), function (el) {
    var it = c.packs.items[+el.dataset.i]; if (!it) return;
    var img = el.querySelector('img'); el.querySelector('.pi').setAttribute('aria-label', 'Ver ' + it.title + ' completa');
    wire(el, function () { show(img.src, img.alt, it.title, it.modalTitle, it.modalText, it.msg); });
  });
  [].forEach.call(document.querySelectorAll('.evg figure'), function (el) {
    var it = c.events.items[+el.dataset.i]; if (!it) return;
    var img = el.querySelector('img'); el.setAttribute('aria-label', 'Ver ' + it.title + ' completa');
    wire(el, function () { show(img.src, img.alt, it.title, it.modalTitle, it.modalText, 'Hola, quisiera cotizar un evento en ' + c.site.brand + ' (' + it.title + ').'); });
  });
  d.querySelector('.xx').addEventListener('click', function () { d.close(); });
  d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
  a.addEventListener('click', function () { d.close(); });
}

function initForm(c) {
  var f = document.getElementById('f'); if (!f) return;
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(f), k = c.contact, p = [], nm = d.get('nm');
    p.push(String(k.msgIntro || '').replace('{nombre}', nm || 'un interesado'));
    if (d.get('in')) p.push(k.lblIn + ': ' + d.get('in'));
    if (d.get('out')) p.push(k.lblOut + ': ' + d.get('out'));
    if (d.get('n')) p.push(k.lblPeople + ': ' + d.get('n'));
    p.push(k.lblMotive + ': ' + d.get('m'));
    if (k.msgOutro) p.push(k.msgOutro);
    window.open(waUrl(c, p.join('\n')), '_blank', 'noopener');
  });
}

/* ───────── Montaje ───────── */
function normalize(c) {
  c = c || {};
  c.site = c.site || {}; c.theme = c.theme || {}; c.sections = c.sections || [];
  ['hero', 'intro', 'why', 'gallery', 'packs', 'events', 'faq', 'location', 'contact', 'footer'].forEach(function (k) { c[k] = c[k] || {}; });
  return c;
}
function mount(c) {
  c = normalize(c); PF.cfg = c;
  cleanup();
  applyTheme(c); applyMeta(c);
  var app = document.getElementById('app');
  app.innerHTML = renderHTML(c);
  initHero(); initMenu(); initGallery(); initModal(c); initForm(c);
  if (!PF.preview) try {
    var col = c.theme.colors || {}, ld = (c.site.loader || {});
    localStorage.setItem('pfBoot', JSON.stringify({ ink: col.ink, panel: col.panel, line: col.line, gold: col.gold, gold2: col.gold2, cream: col.cream, mute: col.mute,
      rgb: [hexRgb(col.ink), hexRgb(col.gold), hexRgb(col.gold2), hexRgb(col.cream)], mode: c.theme.mode, loader: ld }));
  } catch (e) {}
}

PF.ICONS = ICONS; PF.SOCIAL_ICONS = SOCIAL_ICONS; PF.SECTIONS = SECTIONS; PF.ANCHORS = ANCHORS; PF.FONTS = FONTS; PF.FONT_PRESETS = FONT_PRESETS;
PF.PALETTES = PALETTES; PF.mount = mount; PF.renderHTML = renderHTML; PF.applyTheme = applyTheme; PF.fontsHref = fontsHref; PF.hexRgb = hexRgb; PF.esc = esc;

/* Arranque automático solo en la página pública (el panel carga este archivo como librería) */
if (typeof document !== 'undefined' && document.getElementById('app') && !PF.noBoot) {
  PF.preview = /[?&]pfpreview/.test(location.search);
  var ready = function () { if (window.__pfReady) window.__pfReady(); };
  if (PF.preview) {
    window.addEventListener('message', function (e) {
      if (e.origin !== location.origin || !e.data) return;
      var m = e.data, y = window.scrollY;
      if (m.pf === 'cfg') { mount(m.cfg); window.scrollTo(0, y); }
      else if (m.pf === 'goto') { var el = document.getElementById(m.id); if (el) el.scrollIntoView(); }
    });
    if (parent !== window) parent.postMessage({ pf: 'ready' }, location.origin);
  } else {
    fetch('config.json', { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (c) { mount(c); ready(); })
      .catch(function (err) {
        document.getElementById('app').innerHTML = '<p style="padding:60px 20px;text-align:center">No se pudo cargar la página. Actualiza en unos segundos.</p>';
        ready(); if (window.console) console.error(err);
      });
  }
}
})();
