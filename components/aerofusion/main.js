import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let resizeHandler = null
let booted = false
let loadGeneration = 0
let preloadObservers = []

/* ------------------------------------------------------------------
   Frame sequences
------------------------------------------------------------------ */
const HERO_COUNT = 121
const ORBIT_COUNT = 121
const EXPLODE_COUNT = 121

const pad = (n) => String(n).padStart(3, '0')
const isMobileViewport = () => window.matchMedia('(max-width: 860px)').matches
const getDpr = () => Math.min(window.devicePixelRatio || 1, isMobileViewport() ? 1.5 : 2)
const heroSrcDesktop = (i) => `/frames/hero/h_${pad(i + 1)}.jpg`
const heroSrcMobile = (i) => `/frames/hero-m/h_${pad(i + 1)}.jpg`
const getHeroSrc = () => (isMobileViewport() ? heroSrcMobile : heroSrcDesktop)
const orbitSrc = (i) => `/frames/orbit/o_${pad(i + 1)}.jpg`
const explodeSrc = (i) => `/frames/explode/e_${pad(i + 1)}.jpg`

/* scene state */
const hero = {
  canvas: null,
  ctx: null,
  imgs: [],
  frame: 0,
  count: HERO_COUNT,
  focusX: 0.5,
  focusY: 0.5,
  usingMobile: null,
}
const orbit = { canvas: null, ctx: null, imgs: [], frame: 0, count: ORBIT_COUNT, scale: 1, focusX: 0.5, focusY: 0.5 }
const explode = { canvas: null, ctx: null, imgs: [], frame: 0, count: EXPLODE_COUNT, scale: 1, focusX: 0.5, focusY: 0.5 }

/* ------------------------------------------------------------------
   Canvas sizing + cover draw
------------------------------------------------------------------ */
function syncSceneFocus() {
  const mobile = isMobileViewport()
  // PC: 가로 프레임 중앙. 모바일: 세로 프레임(3:4) — 피사체가 하단 쪽에 있어 살짝 아래로
  hero.focusX = 0.5
  hero.focusY = mobile ? 0.58 : 0.5
  orbit.focusX = 0.5
  orbit.focusY = mobile ? 0.48 : 0.5
  explode.focusX = 0.5
  explode.focusY = mobile ? 0.5 : 0.5
}

function sizeCanvas(scene) {
  const c = scene.canvas
  if (!c) return
  const dpr = getDpr()
  const w = c.clientWidth
  const h = c.clientHeight
  const nextW = Math.round(w * dpr)
  const nextH = Math.round(h * dpr)
  if (c.width !== nextW || c.height !== nextH) {
    c.width = nextW
    c.height = nextH
  }
}

function draw(scene) {
  const { ctx, canvas } = scene
  const target = Math.round(scene.frame)
  let img = scene.imgs[target]
  if (!img || !img.complete || !img.naturalWidth) {
    for (let offset = 1; offset < scene.count; offset++) {
      const before = scene.imgs[target - offset]
      const after = scene.imgs[target + offset]
      if (before?.complete && before.naturalWidth) {
        img = before
        break
      }
      if (after?.complete && after.naturalWidth) {
        img = after
        break
      }
    }
  }
  if (!ctx || !img || !img.complete || !img.naturalWidth) return

  const cw = canvas.width
  const ch = canvas.height
  const iw = img.naturalWidth
  const ih = img.naturalHeight

  const s = Math.max(cw / iw, ch / ih) * (scene.scale || 1)
  const dw = iw * s
  const dh = ih * s
  const fx = Number.isFinite(scene.focusX) ? scene.focusX : 0.5
  const fy = Number.isFinite(scene.focusY) ? scene.focusY : 0.5
  const dx = (cw - dw) * fx
  const dy = (ch - dh) * fy

  ctx.clearRect(0, 0, cw, ch)
  ctx.drawImage(img, dx, dy, dw, dh)
}

/** 뷰포트 전환 시 PC/모바일 히어로 시퀀스를 갈아끼움 */
function ensureHeroFrameSet() {
  const wantMobile = isMobileViewport()
  if (hero.usingMobile === wantMobile) return
  hero.usingMobile = wantMobile
  hero.imgs = []
  const srcFn = getHeroSrc()
  const runId = loadGeneration
  const idx = Math.max(0, Math.min(hero.count - 1, Math.round(hero.frame) || 0))
  loadFrame(hero, srcFn, idx, runId, true).then(() => {
    if (runId !== loadGeneration) return
    draw(hero)
    void preloadSequence(
      hero,
      srcFn,
      Array.from({ length: hero.count }, (_, i) => i).filter((i) => i !== idx),
      runId,
    )
  })
}

/* ------------------------------------------------------------------
   Progressive frame loading
------------------------------------------------------------------- */
function loadFrame(scene, srcFn, index, runId, priority = false) {
  if (runId !== loadGeneration) return Promise.resolve()

  const existing = scene.imgs[index]
  if (existing?.complete) return Promise.resolve()

  return new Promise((resolve) => {
    const im = existing || new Image()
    const settle = () => {
      if (runId === loadGeneration) draw(scene)
      resolve()
    }

    im.decoding = 'async'
    if (priority) im.fetchPriority = 'high'
    im.addEventListener('load', settle, { once: true })
    im.addEventListener('error', settle, { once: true })
    if (!existing) {
      scene.imgs[index] = im
      im.src = srcFn(index)
    }
  })
}

async function preloadSequence(scene, srcFn, indexes, runId, concurrency = 4) {
  const queue = [...indexes]
  const worker = async () => {
    while (queue.length && runId === loadGeneration) {
      const index = queue.shift()
      await loadFrame(scene, srcFn, index, runId)
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker))
}

function preloadNearSection(selector, scene, srcFn, runId) {
  const element = document.querySelector(selector)
  if (!element) return

  const start = () => {
    void preloadSequence(
      scene,
      srcFn,
      Array.from({ length: scene.count }, (_, index) => index),
      runId,
    )
  }

  if (!('IntersectionObserver' in window)) {
    start()
    return
  }

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return
    observer.disconnect()
    start()
  }, { rootMargin: '120% 0px' })

  observer.observe(element)
  preloadObservers.push(observer)
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

  const runId = ++loadGeneration
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const fill = document.getElementById('loader-fill')
  const pct = document.getElementById('loader-pct')
  const loaderEl = document.getElementById('loader')

  // size + first paint asap (don't wait for full load)
  hero.usingMobile = isMobileViewport()
  const heroSrc = getHeroSrc()
  syncSceneFocus()
  sizeCanvas(hero)
  sizeCanvas(orbit)
  sizeCanvas(explode)

  function onReady(animate = true) {
    if (runId !== loadGeneration) return
    if (fill) fill.style.width = '100%'
    if (pct) pct.textContent = '100'
    syncSceneFocus()
    sizeCanvas(hero); draw(hero)
    sizeCanvas(orbit); draw(orbit)
    sizeCanvas(explode); draw(explode)
    if (animate) {
      initScroll()
      setupLeaders()
      // driven by gsap's ticker (rAF) rather than a ScrollTrigger onUpdate —
      // see the note above setupLeaders/updateLeaders for why.
      gsap.ticker.add(updateLeaders)
    }
    setTimeout(() => {
      if (runId !== loadGeneration) return
      loaderEl?.classList.add('is-done')
      if (animate) {
        playIntro()
        ScrollTrigger.refresh()
      }
    }, 180)
  }

  if (reduceMotion) {
    document.querySelectorAll('video[autoplay]').forEach((video) => {
      video.autoplay = false
      video.pause()
    })
    hero.frame = 0
    orbit.frame = orbit.count - 1
    explode.frame = explode.count - 1
    Promise.all([
      loadFrame(hero, heroSrc, 0, runId, true),
      loadFrame(orbit, orbitSrc, orbit.count - 1, runId),
      loadFrame(explode, explodeSrc, explode.count - 1, runId),
    ]).then(() => onReady(false))
    return
  }

  loadFrame(hero, heroSrc, 0, runId, true).then(() => {
    onReady(true)
    void preloadSequence(
      hero,
      heroSrc,
      Array.from({ length: hero.count - 1 }, (_, index) => index + 1),
      runId,
    )
    preloadNearSection('.orbit', orbit, orbitSrc, runId)
    preloadNearSection('.explode', explode, explodeSrc, runId)
  })
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
   Mobile nav
------------------------------------------------------------------ */
let mobileNavBound = false

function setupMobileNav() {
  const nav = document.getElementById('nav')
  const toggle = document.getElementById('nav-toggle')
  const links = document.getElementById('nav-links')
  if (!nav || !toggle || !links || mobileNavBound) return
  mobileNavBound = true

  const close = () => {
    nav.classList.remove('is-open')
    toggle.setAttribute('aria-expanded', 'false')
    toggle.setAttribute('aria-label', '메뉴 열기')
    document.body.style.overflow = ''
  }

  const open = () => {
    nav.classList.add('is-open')
    toggle.setAttribute('aria-expanded', 'true')
    toggle.setAttribute('aria-label', '메뉴 닫기')
    document.body.style.overflow = 'hidden'
  }

  toggle.addEventListener('click', (event) => {
    event.stopPropagation()
    if (nav.classList.contains('is-open')) close()
    else open()
  })

  links.querySelectorAll('a').forEach((anchor) => {
    anchor.addEventListener('click', () => close())
  })

  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('is-open')) return
    if (nav.contains(event.target)) return
    close()
  })

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close()
  })
}

/* ------------------------------------------------------------------
   Reviews mobile carousel (pill pager — distinct from lineup dots)
------------------------------------------------------------------ */
let reviewsCarouselBound = false

function setupReviewsCarousel() {
  const track = document.getElementById('reviews-carousel')
  const pager = document.getElementById('reviews-pager')
  if (!track || !pager || reviewsCarouselBound) return
  reviewsCarouselBound = true

  const cards = Array.from(track.querySelectorAll('.rcard'))
  if (!cards.length) return

  pager.innerHTML = ''
  const pills = cards.map((card, index) => {
    const label = card.querySelector('.rcard__flag')?.textContent?.trim() || `${index + 1}`
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'reviews__pill'
    btn.textContent = label
    btn.setAttribute('aria-label', label)
    btn.addEventListener('click', () => {
      cards[index].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
    })
    pager.appendChild(btn)
    return btn
  })

  const count = document.createElement('span')
  count.className = 'reviews__count'
  count.textContent = `01 / ${String(cards.length).padStart(2, '0')}`
  pager.appendChild(count)

  const videos = () => Array.from(track.querySelectorAll('video'))

  const syncActive = () => {
    if (!window.matchMedia('(max-width: 860px)').matches) {
      pills.forEach((pill) => pill.classList.remove('is-active'))
      return
    }
    const edge = track.scrollLeft + 24
    let best = 0
    let bestDist = Infinity
    cards.forEach((card, index) => {
      const dist = Math.abs(card.offsetLeft - edge)
      if (dist < bestDist) {
        bestDist = dist
        best = index
      }
    })
    pills.forEach((pill, index) => {
      pill.classList.toggle('is-active', index === best)
    })
    count.textContent = `${String(best + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`

    videos().forEach((video, index) => {
      if (index !== best && !video.paused) video.pause()
    })
  }

  track.addEventListener('scroll', () => {
    window.requestAnimationFrame(syncActive)
  }, { passive: true })
  window.addEventListener('resize', syncActive)
  syncActive()
}
let lineupCarouselBound = false

function setupLineupCarousel() {
  const track = document.getElementById('lineup-carousel')
  const dotsWrap = document.getElementById('lineup-dots')
  if (!track || !dotsWrap || lineupCarouselBound) return
  lineupCarouselBound = true

  const cards = Array.from(track.querySelectorAll('.pcard'))
  if (!cards.length) return

  dotsWrap.innerHTML = ''
  const dots = cards.map((_, index) => {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'lineup__dot'
    btn.setAttribute('aria-label', `${index + 1}번째 제품`)
    btn.addEventListener('click', () => {
      cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    })
    dotsWrap.appendChild(btn)
    return btn
  })

  const syncActive = () => {
    if (!window.matchMedia('(max-width: 860px)').matches) {
      dots.forEach((dot) => dot.classList.remove('is-active'))
      return
    }
    const mid = track.scrollLeft + track.clientWidth / 2
    let best = 0
    let bestDist = Infinity
    cards.forEach((card, index) => {
      const center = card.offsetLeft + card.offsetWidth / 2
      const dist = Math.abs(center - mid)
      if (dist < bestDist) {
        bestDist = dist
        best = index
      }
    })
    dots.forEach((dot, index) => {
      dot.classList.toggle('is-active', index === best)
    })
  }

  track.addEventListener('scroll', () => {
    window.requestAnimationFrame(syncActive)
  }, { passive: true })
  window.addEventListener('resize', syncActive)
  syncActive()
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
        syncSceneFocus()
        ensureHeroFrameSet()
        sizeCanvas(hero); draw(hero)
        sizeCanvas(orbit); draw(orbit)
        sizeCanvas(explode); draw(explode)
        updateLeaders()
        ScrollTrigger.refresh()
        if (window.innerWidth > 860) {
          document.getElementById('nav')?.classList.remove('is-open')
          document.body.style.overflow = ''
        }
      }, 160)
    }
    window.addEventListener('resize', resizeHandler)
  }
  setupMobileNav()
  setupReviewsCarousel()
  setupLineupCarousel()
  boot()
}

export function destroyAerofusion() {
  loadGeneration++
  preloadObservers.forEach((observer) => observer.disconnect())
  preloadObservers = []
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }
  clearTimeout(resizeTO)
  gsap.ticker.remove(updateLeaders)
  ScrollTrigger.getAll().forEach((t) => t.kill())
  gsap.killTweensOf('*')
  booted = false
  mobileNavBound = false
  lineupCarouselBound = false
  reviewsCarouselBound = false
  document.body.style.overflow = ''
  hero.frame = 0
  hero.usingMobile = null
  orbit.frame = 0
  orbit.scale = 1
  explode.frame = 0
  explode.scale = 1
  hero.imgs = []
  orbit.imgs = []
  explode.imgs = []
  leaders = null
}
