import { useEffect } from 'react';

const STEP = 1000 / 60; // fixed physics step
const WALL = 400; // thick walls so thrown items can't tunnel out
const MAX_SPEED = 48;

/** Feel knobs: "livelier" tuning. Lower restitution / higher friction = calmer. */
const FEEL = {
  gravity: 1.15,
  restitution: { tool: 0.62, text: 0.5 },
  friction: 0.28,
  frictionStatic: 0.4,
  airMin: 0.003,
  airRange: 0.012,
  dropSpeed: [3, 9], // min + random range, px/step
  spin: { tool: 1.6, text: 0.5 },
  hop: [14, 6],
  shake: [10, 16],
};

/**
 * Drops DOM elements into a box with real physics (matter-js), then keeps
 * their CSS transforms in sync with the bodies. Elements stay real, readable,
 * focusable DOM; the canvas renderer isn't used.
 *
 * - Drops start once the box scrolls into view, staggered, at different speeds.
 * - Mouse/pen can drag and throw items; touch keeps native scrolling (taps still work).
 * - The loop pauses when everything is asleep or the box is off-screen.
 * - apiRef.current gets { shake(), hop(index) }.
 * - An element that was dragged gets data-dragged="true" so its click can be ignored.
 */
export function usePhysicsPile({ arenaRef, itemsRef, enabled, apiRef }) {
  useEffect(() => {
    const arena = arenaRef.current;
    if (!enabled || !arena) return undefined;
    let cancelled = false;
    let teardown = () => {};

    // Load the physics engine lazily (keeps it out of the first-paint bundle),
    // and measure only after web fonts load so pill widths are right.
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    Promise.all([import('matter-js'), fontsReady]).then(([mod]) => {
      if (!cancelled) teardown = createPile(mod.default ?? mod, arena, itemsRef.current.filter(Boolean), apiRef);
    });

    return () => {
      cancelled = true;
      teardown();
    };
  }, [enabled, arenaRef, itemsRef, apiRef]);
}

function createPile(Matter, arena, els, apiRef) {
  const { Engine, Bodies, Body, Composite, Constraint, Sleeping } = Matter;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = arena.clientWidth;
  let H = arena.clientHeight;

  const engine = Engine.create({ enableSleeping: true });
  engine.gravity.y = FEEL.gravity;

  // Floor, two tall side walls and a high ceiling.
  let walls = [];
  const buildWalls = () => {
    if (walls.length) Composite.remove(engine.world, walls);
    const opts = { isStatic: true, friction: 0.6, restitution: 0.1 };
    walls = [
      Bodies.rectangle(W / 2, H + WALL / 2, W + WALL * 2, WALL, opts),
      Bodies.rectangle(-WALL / 2, 0, WALL, H * 4, opts),
      Bodies.rectangle(W + WALL / 2, 0, WALL, H * 4, opts),
      Bodies.rectangle(W / 2, -H * 2 - WALL / 2, W + WALL * 2, WALL, opts),
    ];
    Composite.add(engine.world, walls);
  };
  buildWalls();

  const entries = els.map((el) => {
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const radius = Math.min(Number(el.dataset.radius) || h / 2, w / 2 - 0.5, h / 2 - 0.5);
    const isText = el.dataset.upright !== undefined;
    const body = Bodies.rectangle(-9999, -9999, w, h, {
      chamfer: { radius },
      restitution: isText ? FEEL.restitution.text : FEEL.restitution.tool,
      friction: FEEL.friction,
      frictionStatic: FEEL.frictionStatic,
      // Different air drag = different fall speeds.
      frictionAir: FEEL.airMin + Math.random() * FEEL.airRange,
      density: 0.0016,
    });
    // Text pills spin less, so their labels stay readable.
    if (isText) Body.setInertia(body, body.inertia * 3);
    return { el, body, w, h, dropped: false, isText };
  });

  let raf = 0;
  let running = false;
  let last = 0;
  let acc = 0;
  let visible = false;
  let pending = entries.length;
  let drag = null;
  const timers = [];

  const render = () => {
    for (const e of entries) {
      if (!e.dropped) continue;
      const { x, y } = e.body.position;
      e.el.style.transform = `translate3d(${(x - e.w / 2).toFixed(1)}px, ${(y - e.h / 2).toFixed(1)}px, 0) rotate(${e.body.angle.toFixed(4)}rad)`;
    }
  };

  const normalise = (a) => Math.atan2(Math.sin(a), Math.cos(a));

  // Cap speeds (no tunnelling) and gently nudge text pills back towards upright.
  const afterStep = () => {
    for (const e of entries) {
      if (!e.dropped || e.body.isSleeping) continue;
      const v = e.body.velocity;
      const speed = Math.hypot(v.x, v.y);
      if (speed > MAX_SPEED) Body.setVelocity(e.body, { x: (v.x / speed) * MAX_SPEED, y: (v.y / speed) * MAX_SPEED });
      if (e.isText && (!drag || drag.entry !== e)) {
        const a = normalise(e.body.angle);
        if (Math.abs(a) > 0.3) Body.setAngularVelocity(e.body, e.body.angularVelocity - Math.sign(a) * 0.0025);
      }
    }
  };

  const settled = () => pending === 0 && !drag && entries.every((e) => e.body.isSleeping);

  const frame = (now) => {
    acc += Math.min(now - last, 100);
    last = now;
    let steps = 0;
    while (acc >= STEP && steps < 4) {
      Engine.update(engine, STEP);
      afterStep();
      acc -= STEP;
      steps += 1;
    }
    render();
    if (!visible || settled()) {
      running = false;
      return;
    }
    raf = requestAnimationFrame(frame);
  };

  const wake = () => {
    if (running || !visible) return;
    running = true;
    last = performance.now();
    acc = 0;
    raf = requestAnimationFrame(frame);
  };

  const wakeBody = (body) => Sleeping.set(body, false);

  const drop = (e) => {
    const x = e.w / 2 + 8 + Math.random() * Math.max(1, W - e.w - 16);
    const y = -e.h / 2 - 24 - Math.random() * 160;
    Body.setPosition(e.body, { x, y });
    const spin = e.isText ? FEEL.spin.text : FEEL.spin.tool;
    const [vMin, vRange] = FEEL.dropSpeed;
    Body.setAngle(e.body, (Math.random() - 0.5) * 0.7 * spin);
    Body.setVelocity(e.body, { x: (Math.random() - 0.5) * 5, y: vMin + Math.random() * vRange });
    Body.setAngularVelocity(e.body, (Math.random() - 0.5) * 0.09 * spin);
    Composite.add(engine.world, e.body);
    e.dropped = true;
    e.el.style.visibility = 'visible';
    pending -= 1;
    render();
    wake();
  };

  // Shuffle so tools and interests interleave; stagger so they never fall at once.
  const scheduleDrops = () => {
    const order = entries.slice().sort(() => Math.random() - 0.5);
    order.forEach((e, i) => {
      const delay = reduce ? 0 : 120 + i * 130 + Math.random() * 110;
      timers.push(setTimeout(() => drop(e), delay));
    });
  };

  // ── Interactions ─────────────────────────────────────────────
  const local = (ev) => {
    const r = arena.getBoundingClientRect();
    return { x: ev.clientX - r.left, y: ev.clientY - r.top };
  };

  const onDown = (ev) => {
    if (ev.pointerType === 'touch') return; // keep native scroll on phones
    if (ev.pointerType === 'mouse' && ev.button !== 0) return;
    const entry = entries.find((x) => x.el === ev.currentTarget);
    if (!entry?.dropped || drag) return;
    const p = local(ev);
    const constraint = Constraint.create({
      pointA: p,
      bodyB: entry.body,
      pointB: { x: p.x - entry.body.position.x, y: p.y - entry.body.position.y },
      stiffness: 0.18,
      damping: 0.08,
      length: 0,
    });
    Composite.add(engine.world, constraint);
    wakeBody(entry.body);
    drag = { entry, constraint, start: p, moved: false, id: ev.pointerId };
    entry.el.dataset.dragging = 'true';
    entry.el.dataset.dragged = '';
    try {
      ev.currentTarget.setPointerCapture(ev.pointerId);
    } catch {
      /* capture is best-effort */
    }
    wake();
  };

  const onMove = (ev) => {
    if (!drag || ev.pointerId !== drag.id) return;
    const p = local(ev);
    drag.constraint.pointA = p;
    if (!drag.moved && Math.hypot(p.x - drag.start.x, p.y - drag.start.y) > 6) drag.moved = true;
    wakeBody(drag.entry.body);
  };

  const onUp = (ev) => {
    if (!drag || ev.pointerId !== drag.id) return;
    const { entry, constraint, moved } = drag;
    Composite.remove(engine.world, constraint);
    delete entry.el.dataset.dragging;
    if (moved) entry.el.dataset.dragged = 'true';
    drag = null;
    wake();
  };

  els.forEach((el) => {
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    el.addEventListener('lostpointercapture', onUp);
  });

  const hop = (index) => {
    const e = entries[index];
    if (!e?.dropped) return;
    wakeBody(e.body);
    const [hMin, hRange] = FEEL.hop;
    Body.setVelocity(e.body, { x: (Math.random() - 0.5) * 7, y: -hMin - Math.random() * hRange });
    Body.setAngularVelocity(e.body, (Math.random() - 0.5) * 0.5);
    wake();
  };

  const shake = () => {
    entries.forEach((e) => {
      if (!e.dropped) return;
      wakeBody(e.body);
      const [sMin, sRange] = FEEL.shake;
      Body.setVelocity(e.body, { x: (Math.random() - 0.5) * 16, y: -sMin - Math.random() * sRange });
      Body.setAngularVelocity(e.body, (Math.random() - 0.5) * (e.isText ? 0.25 : 0.45));
    });
    wake();
  };

  if (apiRef) apiRef.current = { hop, shake };

  // ── Visibility & resize ──────────────────────────────────────
  let scheduled = false;
  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !scheduled) {
        scheduled = true;
        scheduleDrops();
      }
      if (visible) wake();
    },
    { threshold: 0.2 },
  );
  io.observe(arena);

  const ro = new ResizeObserver(() => {
    const nw = arena.clientWidth;
    const nh = arena.clientHeight;
    if (nw === W && nh === H) return;
    W = nw;
    H = nh;
    buildWalls();
    entries.forEach((e) => {
      if (!e.dropped) return;
      const p = e.body.position;
      const x = Math.min(Math.max(p.x, e.w / 2), W - e.w / 2);
      const y = Math.min(p.y, H - e.h / 2);
      if (x !== p.x || y !== p.y) Body.setPosition(e.body, { x, y });
      wakeBody(e.body);
    });
    wake();
  });
  ro.observe(arena);

  return () => {
    cancelAnimationFrame(raf);
    timers.forEach(clearTimeout);
    io.disconnect();
    ro.disconnect();
    els.forEach((el) => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      el.removeEventListener('lostpointercapture', onUp);
      el.style.transform = '';
      el.style.visibility = '';
      delete el.dataset.dragging;
    });
    Composite.clear(engine.world, false);
    Engine.clear(engine);
    if (apiRef) apiRef.current = null;
  };
}
