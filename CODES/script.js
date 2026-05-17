/* ═══════════════════════════════════
   MONTHSARY SCRIPT — BLUE EDITION
   Photos/videos are loaded from the
   img/ folder. Edit MEMORIES below.
═══════════════════════════════════ */

const $ = id => document.getElementById(id);
const rand  = (a, b) => Math.random() * (b - a) + a;
const rInt  = (a, b) => Math.floor(rand(a, b));

/* ─── CONFIG ─────────────────────── */
const SPARK_COLORS  = ['#6b9fff','#3a6fd8','#b8d0ff','#ffffff','#4488ff','#99bbff'];
const PARTICLE_COLS = ['rgba(107,159,255,', 'rgba(58,111,216,', 'rgba(184,208,255,'];
const STARS         = ['✦','✧','⋆','·','★','☆','✩','♒','♏','✴','✵','⭐','💫','🌟'];
const MESSAGES = [
  "Every day with you feels like the most beautiful dream…",
  "One month down, a lifetime of love to go. 💙",
  "Thank you for making every moment so magical.",
  "You make my world so much brighter. 🌙",
  "Here's to forever, one beautiful day at a time. ✦"
];

/* ════════════════════════════════════════════════
   ✏️  EDIT THIS ARRAY to change your memories!
   - src: path to your image or video file
   - type: 'image' or 'video'
   - caption: the caption shown in the viewer

   Put all your files in the img/ folder next to
   index.html, then just update the src paths here.
════════════════════════════════════════════════ */
const MEMORIES = [
  { src: 'img/mem1.jpg',  type: 'image', caption: '💙'},
  { src: 'img/mem2.jpg',  type: 'image', caption: '🌙'},
  { src: 'img/mem3.jpg',  type: 'image', caption: '✦ '},
  { src: 'img/mem4.jpg',  type: 'image', caption: '💫'},
  { src: 'img/mem5.jpg',  type: 'image', caption: '🌷'},
  { src: 'img/mem6.jpg',  type: 'image', caption: '⭐'},
  // Add more like:
  // { src: 'img/ourvideo.mp4', type: 'video', caption: '🎬 A special day' },
];

/* ─── BACKGROUND PARTICLES ───────── */
function initParticles() {
  const c = $('bgParticles');
  if (!c) return;

  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = rand(6, 22);
    const col  = PARTICLE_COLS[rInt(0, PARTICLE_COLS.length)];
    p.style.cssText = `
      left:${rand(0,100)}%;
      bottom:${rand(-10,10)}%;
      width:${size}px; height:${size}px;
      background:${col}${rand(0.3,0.8)});
      animation-duration:${rand(7,16)}s;
      animation-delay:${rand(0,12)}s;
    `;
    c.appendChild(p);
  }

  for (let i = 0; i < 28; i++) {
    const s = document.createElement('span');
    s.className   = 'star-particle';
    s.textContent = STARS[rInt(0, STARS.length)];
    s.style.cssText = `
      left:${rand(0,100)}%;
      bottom:${rand(-5,5)}%;
      color:rgba(107,159,255,${rand(0.4,0.9)});
      font-size:${rand(0.7,1.6)}rem;
      animation-duration:${rand(8,18)}s;
      animation-delay:${rand(0,14)}s;
    `;
    c.appendChild(s);
  }
}

/* ─── FLOATING HEARTS ────────────── */
function initFloatingHearts() {
  const c = $('floatingHearts');
  if (!c) return;
  const heartsArr = ['💙','💙','✦','💫','🌙','💙','✧','💙'];
  function spawnHeart() {
    const h = document.createElement('span');
    h.className = 'fheart';
    h.textContent = heartsArr[rInt(0, heartsArr.length)];
    const size = rand(0.7, 1.8);
    h.style.cssText = `
      left:${rand(3,95)}%;
      font-size:${size}rem;
      animation-duration:${rand(6,13)}s;
      animation-delay:${rand(0,2)}s;
      opacity:0;
    `;
    c.appendChild(h);
    setTimeout(() => h.remove(), 14000);
    setTimeout(spawnHeart, rand(700, 1800));
  }
  spawnHeart();
}

/* ─── LIVE COUNTER ───────────────── */
function initCounter() {
  const start = new Date();
  start.setMonth(start.getMonth() - 1);

  function update() {
    const diff = Date.now() - start.getTime();
    const totalDays = Math.floor(diff / 86400000);
    animateNum($('days'), totalDays);
  }
  update();
  setInterval(update, 60000);
}

function animateNum(el, target) {
  if (!el) return;
  const current = parseInt(el.textContent.replace(/,/g,'')) || 0;
  if (current === target) return;
  const dur = 900, t0 = performance.now();
  function step(now) {
    const p = Math.min((now - t0) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(current + (target - current) * e).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ─── TYPEWRITER ─────────────────── */
function initTypewriter() {
  const el = $('message');
  if (!el) return;
  let ti = 0, ci = 0, del = false;

  function tick() {
    const txt = MESSAGES[ti];
    if (!del) {
      el.textContent = txt.slice(0, ci++);
      if (ci > txt.length) { del = true; return setTimeout(tick, 2600); }
      setTimeout(tick, 36);
    } else {
      el.textContent = txt.slice(0, ci--);
      if (ci < 0) { del = false; ti = (ti + 1) % MESSAGES.length; ci = 0; return setTimeout(tick, 400); }
      setTimeout(tick, 20);
    }
  }
  setTimeout(tick, 1600);
}

/* ─── SPARKS ─────────────────────── */
function burstSparks(ox, oy) {
  const c = $('sparks');
  if (!c) return;
  const rect = c.getBoundingClientRect();
  const cx = ox - rect.left, cy = oy - rect.top;

  for (let i = 0; i < 24; i++) {
    const sp = document.createElement('div');
    sp.className = 'spark';
    const angle = (i / 24) * Math.PI * 2;
    const dist  = rand(50, 140);
    sp.style.cssText = `
      left:${cx}px; top:${cy}px;
      width:${rand(5,11)}px; height:${rand(5,11)}px;
      background:${SPARK_COLORS[rInt(0, SPARK_COLORS.length)]};
      --tx:${Math.cos(angle)*dist}px;
      --ty:${Math.sin(angle)*dist}px;
      animation-delay:${rand(0,.18)}s;
    `;
    c.appendChild(sp);
    setTimeout(() => sp.remove(), 1100);
  }
}

/* ─── LOVE POPUP ─────────────────── */
function initLovePopup() {
  const btn   = $('loveBtn') || $('gameBtn'); // gameBtn is the actual button ID
  const popup = $('popup');
  const close = $('closeBtn');
  if (!popup) return; // bail safely if elements missing

  btn.addEventListener('click', e => {
    const r = btn.getBoundingClientRect();
    burstSparks(r.left + r.width/2, r.top + r.height/2);
    setTimeout(() => popup.classList.add('show'), 220);
  });

  close?.addEventListener('click', () => {
    popup.classList.remove('show');
    const r = close.getBoundingClientRect();
    burstSparks(r.left + r.width/2, r.top + r.height/2);
  });

  popup.addEventListener('click', e => {
    if (e.target === popup) popup.classList.remove('show');
  });
}

/* ─── THEATER / MEMORIES ─────────── */
function initTheater() {
  const box       = $('memoriesBox');
  const theater   = $('theater');
  const tClose    = $('theaterClose');
  const strip     = $('memoryStrip');
  const viewerImg = $('viewerImg');
  const caption   = $('theaterCaption');

  if (!box || !theater || !strip) return;

  /* Build thumbnails from the hardcoded MEMORIES array */
  MEMORIES.forEach((mem, idx) => {
    const thumb = document.createElement('div');
    thumb.className = 'memory-thumb';
    thumb.dataset.idx = idx;

    if (mem.type === 'image') {
      const img = document.createElement('img');
      img.src = mem.src;
      img.alt = mem.caption;
      img.onerror = () => { thumb.classList.add('broken'); thumb.innerHTML = '<span class="broken-label">📷</span>'; };
      thumb.appendChild(img);
    } else {
      const vid = document.createElement('video');
      vid.src = mem.src;
      vid.muted = true;
      vid.addEventListener('loadeddata', () => { vid.currentTime = 0.5; });
      thumb.appendChild(vid);
      const badge = document.createElement('span');
      badge.className = 'vid-badge';
      badge.textContent = '▶ video';
      thumb.appendChild(badge);
    }

    thumb.addEventListener('click', () => openMemory(idx, viewerImg, caption, strip));
    strip.appendChild(thumb);
  });

  /* Auto-open first memory when theater opens */
  box.addEventListener('click', () => {
    theater.classList.add('show');
    if (MEMORIES.length > 0) openMemory(0, viewerImg, caption, strip);
  });

  tClose?.addEventListener('click', () => theater.classList.remove('show'));
  theater.addEventListener('click', e => { if (e.target === theater) theater.classList.remove('show'); });
}

function openMemory(idx, viewerImg, caption, strip) {
  const mem = MEMORIES[idx];
  if (!mem) return;

  strip.querySelectorAll('.memory-thumb').forEach(t => t.classList.remove('active'));
  const active = strip.querySelector(`[data-idx="${idx}"]`);
  if (active) active.classList.add('active');

  /* Fade transition */
  viewerImg.style.opacity = '0';
  setTimeout(() => {
    viewerImg.src = mem.src;
    viewerImg.style.opacity = '1';
  }, 200);

  if (caption) caption.textContent = mem.caption;
}

/* ─── CARD 3D TILT (desktop) ──────── */
function initTilt() {
  const card = $('card');
  if (!card || window.matchMedia('(pointer:coarse)').matches) return;
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width/2)  / (r.width/2);
    const dy = (e.clientY - r.top  - r.height/2) / (r.height/2);
    card.style.transform = `perspective(900px) rotateY(${dx*4}deg) rotateX(${-dy*4}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
}

/* ─── PERIODIC SPARKLE ───────────── */
function initPeriodicSparks() {
  const card = $('card');
  if (!card) return;
  setInterval(() => {
    const r = card.getBoundingClientRect();
    burstSparks(rand(r.left+60, r.right-60), rand(r.top+60, r.bottom-60));
  }, 5500);
}

/* ─── SHOOTING STARS ─────────────── */
function initShootingStars() {
  function shoot() {
    const el = document.createElement('div');
    el.className = 'shooting-star';
    const x = rand(5, 85), y = rand(5, 50);
    const dur = rand(0.6, 1.2);
    const angle = rand(20, 50);
    el.style.cssText = `
      left:${x}vw; top:${y}vh;
      animation-duration:${dur}s;
      box-shadow: 0 0 6px 2px rgba(200,225,255,0.9), ${rand(30,80)}px 0 ${rand(40,80)}px 0 rgba(180,210,255,0.1);
      transform-origin: 0 0;
      rotate: ${angle}deg;
      width:${rand(60,120)}px;
      height:1.5px;
      border-radius:2px;
      background:linear-gradient(to right,rgba(255,255,255,0),rgba(200,225,255,1),rgba(255,255,255,0.2));
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000 + 100);
    setTimeout(shoot, rand(2800, 6000));
  }
  setTimeout(shoot, 1800);
}

/* ─── ZODIAC LOVE POPUP ───────────── */
function initZodiacPopup() {
  const box       = $('zodiacBox');
  const popup     = $('zodiacPopup');
  const zpClose   = $('zpClose');
  const flowerBtn = $('zpFlowerBtn');
  const garden    = $('zpTulipGarden');
  const starsEl   = $('zpShootingStars');
  const loveTextEl = $('zpLoveText');
  if (!box || !popup) return;

  const LOVE_MSG = "I love you baby, thank you sa lahat! Buti nakilala kita 💙";
  let typeInterval = null;
  let shootInterval = null;
  let flowersBlown = false;

  function launchShootingStars() {
    let count = 0;
    shootInterval = setInterval(() => {
      if (count++ > 18) { clearInterval(shootInterval); return; }
      const el = document.createElement('div');
      el.className = 'zp-star-streak';
      const x = rand(5, 90), y = rand(5, 75);
      const dur = rand(0.55, 1.1);
      const len = rand(55, 130);
      const angle = rand(15, 50);
      el.style.cssText = `
        left:${x}%; top:${y}%;
        width:${len}px;
        animation-duration:${dur}s;
        rotate:${angle}deg;
      `;
      starsEl.appendChild(el);
      setTimeout(() => el.remove(), dur * 1000 + 200);
    }, 160);
  }

  function typeMessage() {
    loveTextEl.textContent = '';
    let i = 0;
    typeInterval = setInterval(() => {
      loveTextEl.textContent = LOVE_MSG.slice(0, i++);
      if (i > LOVE_MSG.length) clearInterval(typeInterval);
    }, 42);
  }

  function openPopup() {
    popup.classList.add('show');
    flowersBlown = false;
    garden.classList.remove('blooming');
    garden.innerHTML = '';
    flowerBtn.disabled = false;
    launchShootingStars();
    setTimeout(typeMessage, 300);
  }

  function closePopup() {
    popup.classList.remove('show');
    clearInterval(typeInterval);
    clearInterval(shootInterval);
  }

  box.addEventListener('click', openPopup);
  zpClose.addEventListener('click', closePopup);
  popup.addEventListener('click', e => { if (e.target === popup) closePopup(); });

  flowerBtn.addEventListener('click', () => {
    if (flowersBlown) return;
    flowersBlown = true;
    garden.classList.add('blooming');

    const tulips = [
      { color: 'red',  x: -80,  delay: 0   },
      { color: 'blue', x: -44,  delay: 100 },
      { color: 'red',  x: -10,  delay: 200 },
      { color: 'blue', x:  26,  delay: 80  },
      { color: 'red',  x:  62,  delay: 180 },
      { color: 'blue', x:  98,  delay: 40  },
      { color: 'red',  x: -118, delay: 260 },
      { color: 'blue', x:  134, delay: 220 },
    ];

    tulips.forEach(t => {
      const el = document.createElement('div');
      el.className = 'tulip';
      el.style.left = `calc(50% + ${t.x}px)`;
      el.innerHTML = makeTulipSVG(t.color);
      garden.appendChild(el);
      setTimeout(() => el.classList.add('bloom'), t.delay + 50);
    });

    const br = flowerBtn.getBoundingClientRect();
    burstSparks(br.left + br.width/2, br.top + br.height/2);
  });
}

function makeTulipSVG(color) {
  const petalColor = color === 'red'
    ? ['#e8304a','#ff6680','#c01830']
    : ['#3a7bd5','#66a8ff','#1a4fa8'];
  const stemColor = '#3a8c4a';
  const leafColor = '#4aae5c';

  return `<svg width="36" height="110" viewBox="0 0 36 110" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 2px 6px ${petalColor[0]}88)">
    <path d="M18 108 Q16 85 18 60" stroke="${stemColor}" stroke-width="2.8" fill="none" stroke-linecap="round"/>
    <path d="M17 82 Q6 74 5 62 Q12 68 17 75" fill="${leafColor}" opacity="0.9"/>
    <path d="M19 76 Q30 68 31 56 Q24 63 19 70" fill="${leafColor}" opacity="0.9"/>
    <ellipse cx="11" cy="42" rx="7" ry="16" fill="${petalColor[0]}" transform="rotate(-18 11 42)"/>
    <ellipse cx="25" cy="42" rx="7" ry="16" fill="${petalColor[0]}" transform="rotate(18 25 42)"/>
    <ellipse cx="18" cy="36" rx="7" ry="17" fill="${petalColor[1]}"/>
    <ellipse cx="10" cy="48" rx="6" ry="13" fill="${petalColor[2]}" transform="rotate(-28 10 48)" opacity="0.7"/>
    <ellipse cx="26" cy="48" rx="6" ry="13" fill="${petalColor[2]}" transform="rotate(28 26 48)" opacity="0.7"/>
    <ellipse cx="18" cy="32" rx="3.5" ry="6" fill="${petalColor[1]}" opacity="0.8"/>
    <ellipse cx="18" cy="30" rx="1.5" ry="3" fill="rgba(255,255,255,0.5)"/>
  </svg>`;
}

/* ─── INIT ───────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initFloatingHearts();
  initShootingStars();
  initCounter();
  initTypewriter();
  initLovePopup();
  initZodiacPopup();
  initTheater();
  initTilt();
  initPeriodicSparks();
});