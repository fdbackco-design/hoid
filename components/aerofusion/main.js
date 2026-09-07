import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let resizeHandler = null
let booted = false

/* ------------------------------------------------------------------
   Frame sequences
------------------------------------------------------------------ */
const HERO_COUNT = 121
const ORBIT_COUNT = 121
const EXPLODE_COUNT = 121

const pad = (n) => String(n).padStart(3, '0')
const heroSrc = (i) => `/frames/hero/h_${pad(i + 1)}.jpg`
const orbitSrc = (i) => `/frames/orbit/o_${pad(i + 1)}.jpg`
const explodeSrc = (i) => `/frames/explode/e_${pad(i + 1)}.jpg`

/* scene state */
const hero = { canvas: null, ctx: null, imgs: [], frame: 0, count: HERO_COUNT }
const orbit = { canvas: null, ctx: null, imgs: [], frame: 0, count: ORBIT_COUNT, scale: 1 }
const explode = { canvas: null, ctx: null, imgs: [], frame: 0, count: EXPLODE_COUNT, scale: 1 }

const DPR = Math.min(window.devicePixelRatio || 1, 2)

/* ------------------------------------------------------------------
   Canvas sizing + cover draw
------------------------------------------------------------------ */
function sizeCanvas(scene) {
  const c = scene.canvas
  const w = c.clientWidth
  const h = c.clientHeight
  c.width = Math.round(w * DPR)
  c.height = Math.round(h * DPR)
}

function draw(scene) {
  const { ctx, canvas } = scene
  const img = scene.imgs[Math.round(scene.frame)]
  if (!ctx || !img || !img.complete || !img.naturalWidth) return

  const cw = canvas.width
  const ch = canvas.height
  const iw = img.naturalWidth
  const ih = img.naturalHeight

  const base = Math.max(cw / iw, ch / ih)
  const s = base * (scene.scale || 1)
  const dw = iw * s
  const dh = ih * s
  const dx = (cw - dw) / 2
  const dy = (ch - dh) / 2

  ctx.clearRect(0, 0, cw, ch)
  ctx.drawImage(img, dx, dy, dw, dh)
}

/* ------------------------------------------------------------------
   Preload with progress
------------------------------------------------------------------ */
function preloadInto(scene, srcFn) {
  const tasks = []
  for (let i = 0; i < scene.count; i++) {
    const im = new Image()
    im.src = srcFn(i)
    scene.imgs[i] = im
    tasks.push(im)
  }
  return tasks
}

function boot() {
  if (booted) return
  hero.canvas = document.getElementById('hero-canvas')
  orbit.canvas = document.getElementById('orbit-canvas')
  explode.canvas = document.getElementById('explode-canvas')
  if (!hero.canvas || !orbit.canvas || !explode.canvas) return
  booted = true
  hero.ctx = hero.canvas.getContext('2d')
  orbit.ctx = orbit.canvas.getContext('2d')
  explode.ctx = explode.canvas.getContext('2d')

  const all = [...preloadInto(hero, heroSrc), ...preloadInto(orbit, orbitSrc), ...preloadInto(explode, explodeSrc)]
  const total = all.length
  let loaded = 0

  const fill = document.getElementById('loader-fill')
  const pct = document.getElementById('loader-pct')
  const loaderEl = document.getElementById('loader')

  const bump = () => {
    loaded++
    const p = Math.round((loaded / total) * 100)
    if (fill) fill.style.width = p + '%'
    if (pct) pct.textContent = p
    if (loaded === total) onReady()
  }

  all.forEach((im) => {
    if (im.complete && im.naturalWidth) bump()
    else {
      im.addEventListener('load', bump, { once: true })
      im.addEventListener('error', bump, { once: true })
    }
  })

  // size + first paint asap (don't wait for full load)
  sizeCanvas(hero)
  sizeCanvas(orbit)
  sizeCanvas(explode)
  const firstHero = hero.imgs[0]
  if (firstHero) firstHero.addEventListener('load', () => draw(hero), { once: true })

  function onReady() {
    sizeCanvas(hero); draw(hero)
    sizeCanvas(orbit); draw(orbit)
    sizeCanvas(explode); draw(explode)
    initScroll()
    setupLeaders()
    // driven by gsap's ticker (rAF) rather than a ScrollTrigger onUpdate —
    // see the note above setupLeaders/updateLeaders for why.
    gsap.ticker.add(updateLeaders)
    setTimeout(() => {
      loaderEl.classList.add('is-done')
      playIntro()
      ScrollTrigger.refresh()
    }, 180)
  }
}

/* ------------------------------------------------------------------
   Intro (hero copy)
------------------------------------------------------------------ */
function playIntro() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.from('.hero__title .line span', { yPercent: 115, duration: 1.1, stagger: 0.09 }, 0)
    .from('[data-hero="eyebrow"]', { y: 20, opacity: 0, duration: 0.8 }, 0.15)
    .from('[data-hero="sub"]', { y: 22, opacity: 0, duration: 0.9 }, 0.5)
    .from('[data-hero="scrollcue"]', { opacity: 0, duration: 0.8 }, 0.8)
    .from('.nav', { y: -30, opacity: 0, duration: 0.9 }, 0.2)
}

/* ------------------------------------------------------------------
   Spec leader-lines — connect each floating callout to a precise
   point on the product with a thin annotation line + dot, so the
   pins read as measured call-outs rather than decorative labels.
------------------------------------------------------------------ */
const SVG_NS = 'http://www.w3.org/2000/svg'
const LEADER_MAP = [
  { pin: '1', corner: 'br' }, // top-left pin -> reaches down-right toward the product
  { pin: '2', corner: 'bl' }, // top-right pin -> reaches down-left
  { pin: '3', corner: 'tr' }, // bottom-left pin -> reaches up-right
  { pin: '4', corner: 'tl' }, // bottom-right pin -> reaches up-left
]
let leaders = null

function setupLeaders() {
  const svg = document.querySelector('.orbit__leaders')
  if (!svg) return

  leaders = LEADER_MAP.map(({ pin, corner }) => {
    const pinEl = document.querySelector(`.specpin[data-pin="${pin}"]`)
    const nodeEl = document.querySelector(`.specnode[data-node="${pin}"]`)
    if (!pinEl || !nodeEl) return null

    const line = document.createElementNS(SVG_NS, 'polyline')
    line.setAttribute('class', 'leader-line')
    line.setAttribute('fill', 'none')
    const ring = document.createElementNS(SVG_NS, 'circle')
    ring.setAttribute('class', 'leader-ring')
    ring.setAttribute('r', '8')
    const dot = document.createElementNS(SVG_NS, 'circle')
    dot.setAttribute('class', 'leader-dot')
    dot.setAttribute('r', '3')

    svg.append(line, ring, dot)
    return { pinEl, nodeEl, corner, line, ring, dot }
  }).filter(Boolean)
}

function cornerPoint(rect, corner) {
  return {
    x: corner.includes('l') ? rect.left : rect.right,
    y: corner.includes('t') ? rect.top : rect.bottom,
  }
}

/* anchor points defined as fractions of the ORBIT FRAME IMAGE (o_121, settled
   front view) and projected through the same cover-fit math as draw(), so the
   dots land on the actual product features at any viewport size/zoom. */
const ORBIT_NODE_FRACS = {
  1: [0.455, 0.71],  // 01 H14 HEPA 필터 — 본체 원통(필터 내장부) 좌상단
  2: [0.505, 0.445], // 02 UV-C 살균 — 헤드 상단부
  3: [0.445, 0.815], // 03 5-in-1 통합 기능 — 실버 그릴 중하단
  4: [0.535, 0.50],  // 04 LED 디스플레이 — 원형 패널 중심
}
function positionSpecnodes() {
  const c = orbit.canvas
  if (!c) return
  const cw = c.clientWidth, ch = c.clientHeight
  if (!cw || !ch) return
  const img = orbit.imgs[orbit.count - 1]
  const iw = (img && img.naturalWidth) || 1440
  const ih = (img && img.naturalHeight) || 810
  const base = Math.max(cw / iw, ch / ih)
  const sc = base * (orbit.scale || 1)
  const dw = iw * sc, dh = ih * sc
  const dx = (cw - dw) / 2, dy = (ch - dh) / 2
  for (const n of Object.keys(ORBIT_NODE_FRACS)) {
    const el = document.querySelector(`.specnode[data-node="${n}"]`)
    if (!el) continue
    const [fx, fy] = ORBIT_NODE_FRACS[n]
    el.style.left = (dx + fx * dw) + 'px'
    el.style.top = (dy + fy * dh) + 'px'
  }
}

function updateLeaders() {
  if (!leaders || !leaders.length) return
  positionSpecnodes()
  const stage = document.querySelector('.orbit__stage')
  if (!stage || getComputedStyle(document.querySelector('.orbit__leaders')).display === 'none') return
  const stageRect = stage.getBoundingClientRect()

  leaders.forEach(({ pinEl, nodeEl, corner, line, ring, dot }) => {
    // NOTE: opacity must be set via .style (inline), not .setAttribute —
    // the stylesheet's `.leader-line { opacity: 0 }` etc. is a CSS
    // declaration and CSS always wins over a presentation attribute,
    // no matter how recently the attribute was set.
    const opacity = parseFloat(getComputedStyle(pinEl).opacity) || 0
    if (opacity <= 0.02) {
      line.style.opacity = 0
      ring.style.opacity = 0
      dot.style.opacity = 0
      return
    }
    const pinRect = pinEl.getBoundingClientRect()
    const nodeRect = nodeEl.getBoundingClientRect()
    const p1 = cornerPoint(pinRect, corner)
    const p2 = { x: nodeRect.left, y: nodeRect.top }
    const ELBOW = 30 // short stub off the card before the line angles toward the product
    const dir = p2.x >= p1.x ? 1 : -1
    const elbow = { x: p1.x + dir * ELBOW, y: p1.y }

    const toStage = (p) => `${p.x - stageRect.left},${p.y - stageRect.top}`
    line.setAttribute('points', `${toStage(p1)} ${toStage(elbow)} ${toStage(p2)}`)
    line.style.opacity = opacity * 0.55

    ring.setAttribute('cx', p2.x - stageRect.left)
    ring.setAttribute('cy', p2.y - stageRect.top)
    ring.style.opacity = opacity * 0.45

    dot.setAttribute('cx', p2.x - stageRect.left)
    dot.setAttribute('cy', p2.y - stageRect.top)
    dot.style.opacity = opacity
  })
}

/* ------------------------------------------------------------------
   Scroll-driven scenes
------------------------------------------------------------------ */
function initScroll() {
  const EASE_NONE = 'none'

  /* --- HERO scrub (CSS sticky handles the pin) --- */
  gsap.to(hero, {
    frame: hero.count - 1,
    ease: EASE_NONE,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
    },
    onUpdate: () => draw(hero),
  })

  // hero copy exits as we scrub
  gsap.to('.hero__copy', {
    yPercent: -12, opacity: 0, ease: EASE_NONE,
    scrollTrigger: { trigger: '.hero', start: '2% top', end: '38% top', scrub: true },
  })
  gsap.to('[data-hero="scrollcue"]', {
    opacity: 0, ease: EASE_NONE,
    scrollTrigger: { trigger: '.hero', start: '2% top', end: '12% top', scrub: true },
  })

  /* --- TRANSITION FLASH (white light over the seam) --- */
  const flashTl = gsap.timeline({
    scrollTrigger: { trigger: '.orbit', start: 'top 92%', end: 'top 22%', scrub: true },
  })
  flashTl
    .to('#flash', { opacity: 1, ease: 'power2.in', duration: 1 })
    .to('#flash', { opacity: 0, ease: 'power2.out', duration: 1 })

  // orbit canvas scale-matches in from larger, resting slightly zoomed for presence
  orbit.scale = 1.18
  gsap.fromTo(orbit, { scale: 1.22 }, {
    scale: 1.08, ease: EASE_NONE,
    scrollTrigger: { trigger: '.orbit', start: 'top 60%', end: 'top top', scrub: true },
    onUpdate: () => draw(orbit),
  })

  /* --- ORBIT scrub --- */
  gsap.to(orbit, {
    frame: orbit.count - 1,
    ease: EASE_NONE,
    scrollTrigger: {
      trigger: '.orbit',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
    },
    onUpdate: () => draw(orbit),
  })

  // orbit intro fade out
  gsap.to('.orbit__intro', {
    opacity: 0, y: -24, ease: EASE_NONE,
    scrollTrigger: { trigger: '.orbit', start: '12% top', end: '30% top', scrub: true },
  })

  // spec pins fade in, staggered by scroll progress
  const pins = gsap.utils.toArray('.specpin')
  pins.forEach((el, i) => {
    const s = 20 + i * 15
    gsap.fromTo(el,
      { opacity: 0, y: 26, filter: 'blur(8px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)', ease: 'power2.out',
        scrollTrigger: { trigger: '.orbit', start: `${s}% top`, end: `${s + 10}% top`, scrub: true },
      })
  })

  /* --- human break: image parallax + copy reveal --- */
  if (document.querySelector('.human')) {
    gsap.fromTo('.human__img', { yPercent: -3.5, scale: 1.05 }, {
      yPercent: 3.5, scale: 1.05, ease: EASE_NONE,
      scrollTrigger: { trigger: '.human', start: 'top bottom', end: 'bottom top', scrub: true },
    })
    gsap.from('.human__title .l span', {
      yPercent: 110, duration: 1.1, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.human', start: 'top 62%' },
    })
    gsap.from(['.human .eyebrow', '.human__sub'], {
      y: 20, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.human', start: 'top 55%' },
    })
  }

  /* --- design product subtle float parallax --- */
  /* design section loop video: play only while visible (also retries blocked autoplay) */
  const designVid = document.querySelector('.design__fig video')
  if (designVid) {
    const io = new IntersectionObserver((ents) => {
      ents.forEach(e => { if (e.isIntersecting) designVid.play().catch(() => {}); else designVid.pause() })
    }, { threshold: 0.15 })
    io.observe(designVid)
  }

  if (document.querySelector('.design__fig img, .design__fig video')) {
    gsap.fromTo('.design__fig img, .design__fig video', { yPercent: 5 }, {
      yPercent: -5, ease: EASE_NONE,
      scrollTrigger: { trigger: '.design', start: 'top bottom', end: 'bottom top', scrub: true },
    })
  }

  /* --- explode: real product-video frame sequence, scrubbed by scroll ---
     Same technique as the orbit section (canvas + drawImage over a preloaded
     frame set) rather than CSS-transformed static layers, so the separation
     reads as an actual filmed/rendered product video, not photos sliding
     apart. The source clip is a real cinematic exploded-view render. */
  if (document.getElementById('explode-canvas')) {
    gsap.to(explode, {
      frame: explode.count - 1,
      ease: EASE_NONE,
      scrollTrigger: {
        trigger: '.explode',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
      },
      onUpdate: () => draw(explode),
    })

    // part labels light up in sequence as their piece separates on screen
    gsap.utils.toArray('.explode__label').forEach((el, i) => {
      const s = 6 + i * 17
      gsap.fromTo(el, { opacity: 0.3 }, {
        opacity: 1, ease: 'power2.out',
        scrollTrigger: { trigger: '.explode', start: `${s}% top`, end: `${s + 12}% top`, scrub: true },
      })
    })

    gsap.from('.explode__intro', {
      opacity: 0, y: 24, duration: 1, ease: 'power2.out',
      scrollTrigger: { trigger: '.explode', start: 'top 60%' },
    })
  }

  /* --- generic reveals --- */
  gsap.utils.toArray('.reveal').forEach((el) => {
    ScrollTrigger.create({
      trigger: el, start: 'top 86%',
      onEnter: () => el.classList.add('is-in'),
    })
  })

  /* --- stat counters --- */
  gsap.utils.toArray('.stat__num').forEach((el) => {
    const target = parseFloat(el.dataset.count)
    const decimals = (el.dataset.count.split('.')[1] || '').length
    const obj = { v: 0 }
    ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: target, duration: 1.6, ease: 'power2.out',
          onUpdate: () => { el.textContent = obj.v.toFixed(decimals) },
        })
      },
    })
  })

  /* --- nav scroll state --- */
  const navEl = document.getElementById('nav')
  ScrollTrigger.create({
    start: 'top -40', end: 99999,
    onUpdate: (self) => navEl.classList.toggle('is-scrolled', self.scroll() > 40),
  })

  /* --- nav color adapts to dark sections --- */
  ;['#design', '#explode', '#cta'].forEach((sel) => {
    ScrollTrigger.create({
      trigger: sel,
      start: 'top 64px',
      end: 'bottom 64px',
      onToggle: (self) => navEl.classList.toggle('on-dark', self.isActive),
    })
  })
}

/* ------------------------------------------------------------------
   Resize / lifecycle (Next.js client mount)
------------------------------------------------------------------ */
let resizeTO

export function initAerofusion() {
  if (!resizeHandler) {
    resizeHandler = () => {
      clearTimeout(resizeTO)
      resizeTO = setTimeout(() => {
        sizeCanvas(hero); draw(hero)
        sizeCanvas(orbit); draw(orbit)
        sizeCanvas(explode); draw(explode)
        updateLeaders()
        ScrollTrigger.refresh()
      }, 160)
    }
    window.addEventListener('resize', resizeHandler)
  }
  boot()
}

export function destroyAerofusion() {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }
  clearTimeout(resizeTO)
  gsap.ticker.remove(updateLeaders)
  ScrollTrigger.getAll().forEach((t) => t.kill())
  gsap.killTweensOf('*')
  booted = false
  hero.imgs = []
  orbit.imgs = []
  explode.imgs = []
  leaders = null
}
