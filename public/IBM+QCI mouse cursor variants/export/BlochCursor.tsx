"use client";

import { useEffect, useRef } from "react";

/**
 * BlochCursor — a custom pointer shaped like a miniature Bloch sphere.
 *
 * The sphere holds a basis state (|0>, |1>, |+>, |->). Hovering an interactive
 * element previews what that element's gate would do to the held state; clicking
 * applies it. Elements opt into a gate with `data-gate="H" | "X" | "Z"`; anything
 * else interactive gets the plain hover, and a click outside a gated element just
 * cycles to the next state.
 *
 * Why a DOM layer rather than `cursor: url(...)`: a static image cannot animate,
 * and an animated SVG cursor is not supported across browsers. Every frame here
 * writes transforms and opacity only — no layout, no re-render (React state is
 * never touched by the animation loop).
 *
 * Accessibility: the component returns null under `prefers-reduced-motion` and on
 * any pointer that is not fine (touch, stylus), leaving the native cursor alone.
 * The native cursor is only hidden after the layer has mounted, so a JS failure
 * can never leave the page with no pointer at all.
 */

type GateName = "H" | "X" | "Z";

/** The four states, as angles on the x–z slice of the sphere: 0deg is +z (up),
 *  180deg is -z (down), 90deg is +x, -90deg is -x. `spin` sets the idle rotation
 *  speed of the equator, in degrees per frame. */
const STATES = [
  { label: "|0\u27e9", angle: 0, spin: 0.5, color: "var(--c-gold)" },
  { label: "|1\u27e9", angle: 180, spin: 2.4, color: "var(--c-purple)" },
  { label: "|+\u27e9", angle: 90, spin: 1.2, color: "var(--c-sky)" },
  { label: "|\u2212\u27e9", angle: -90, spin: -1.8, color: "var(--c-gold-strong)" },
] as const;

/** Where each gate sends each state, in STATES index order.
 *  H swaps the z and x axes; X flips z; Z flips x. Cases where the gate only adds a
 *  global phase (X on |->) map to themselves, which is correct — a global phase is
 *  invisible on the sphere — and the vector shivers in place instead of moving. */
const GATES: Record<GateName, readonly [number, number, number, number]> = {
  H: [2, 3, 0, 1],
  X: [1, 0, 2, 3],
  Z: [0, 1, 3, 2],
};

/** What counts as hoverable. `data-gate` is listed so a non-interactive element can
 *  still carry a gate if the design calls for it. */
const HIT_SELECTOR = 'a, button, summary, [role="button"], [data-gate]';

export type BlochCursorProps = {
  /** Diameter of the sphere in px. Everything else scales from it. */
  size?: number;
  /** Set false to keep the native cursor visible alongside the sphere. */
  hideNativeCursor?: boolean;
};

export function BlochCursor({ size = 34, hideNativeCursor = true }: BlochCursorProps) {
  const layer = useRef<HTMLDivElement | null>(null);
  const halo = useRef<HTMLSpanElement | null>(null);
  const sphere = useRef<HTMLSpanElement | null>(null);
  const equator = useRef<HTMLSpanElement | null>(null);
  const meridian = useRef<HTMLSpanElement | null>(null);
  const vector = useRef<HTMLSpanElement | null>(null);
  const vtip = useRef<HTMLSpanElement | null>(null);
  const core = useRef<HTMLSpanElement | null>(null);
  const label = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // Bail on reduced motion and on coarse pointers. Checked inside the effect so it
    // never runs during SSR, and read once — a mid-session change is rare enough that
    // reloading is an acceptable cost for keeping the loop simple.
    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;

    const el = {
      layer: layer.current,
      halo: halo.current,
      sphere: sphere.current,
      equator: equator.current,
      meridian: meridian.current,
      vector: vector.current,
      vtip: vtip.current,
      core: core.current,
      label: label.current,
    };
    if (!el.layer || !el.sphere || !el.vector || !el.label) return;

    if (hideNativeCursor) document.documentElement.classList.add("qff-cursor-hidden");

    // Pointer target vs. rendered position, so the sphere eases rather than teleports.
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let inside = false;
    let hover = 0;
    let gate: GateName | null = null;
    let stateIdx = 0;
    let vecAngle = 0;
    let spin = 0;
    let pulse = 0;
    let driveAmp = 0;
    let phase = 0;
    let raf = 0;

    const readGate = (node: Element | null): GateName | null => {
      const g = node instanceof HTMLElement ? node.dataset.gate : undefined;
      return g === "H" || g === "X" || g === "Z" ? g : null;
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!inside) {
        inside = true;
        x = tx;
        y = ty;
        el.layer!.style.opacity = "1";
      }
      const target = e.target instanceof Element ? e.target.closest(HIT_SELECTOR) : null;
      hover = target ? 1 : 0;
      gate = readGate(target);
    };

    const hide = () => {
      inside = false;
      hover = 0;
      gate = null;
      el.layer!.style.opacity = "0";
    };

    const onDown = () => {
      const map = gate ? GATES[gate] : null;
      stateIdx = map ? map[stateIdx] : (stateIdx + 1) % STATES.length;
      pulse = 1;
    };

    const frame = () => {
      const st = STATES[stateIdx];
      const map = gate ? GATES[gate] : null;
      const preview = map ? STATES[map[stateIdx]] : null;

      x += (tx - x) * 0.55;
      y += (ty - y) * 0.55;
      driveAmp += ((hover ? 1 : 0) - driveAmp) * 0.12;
      phase = (phase + 0.045) % (Math.PI * 2);
      pulse *= 0.9;
      spin += st.spin * (1 + driveAmp * 1.6);

      // Where the vector should point: its own state, leaned most of the way toward
      // the previewed result while hovering a gate, plus a small live wobble so the
      // preview reads as pending rather than committed.
      let goal: number = st.angle;
      if (preview) {
        let delta = preview.angle - st.angle;
        while (delta > 180) delta -= 360;
        while (delta < -180) delta += 360;
        const invariant = Math.abs(delta) < 1;
        goal =
          st.angle +
          delta * (0.86 * driveAmp) +
          Math.sin(phase * 2) * (invariant ? 7 : 3) * driveAmp;
      }
      let d = goal - vecAngle;
      while (d > 180) d -= 360;
      while (d < -180) d += 360;
      vecAngle += d * (hover ? 0.34 : 0.16);

      const s = (hover ? 1.22 : 1) * (1 + pulse * 0.28);
      const at = (px: number, py: number, extra = "") =>
        `translate(${px}px,${py}px) translate(-50%,-50%)${extra}`;
      const rad = (spin * Math.PI) / 180;

      el.sphere!.style.transform = at(x, y, ` scale(${s})`);
      el.sphere!.style.opacity = String(0.5 + driveAmp * 0.3);

      // The equator and meridian fake 3D rotation by squashing on opposite phases.
      el.equator!.style.transform =
        at(x, y, ` scale(${s}) scaleY(${0.16 + Math.abs(Math.sin(rad)) * 0.5})`);
      el.meridian!.style.transform =
        at(x, y, ` scale(${s}) scaleX(${0.16 + Math.abs(Math.cos(rad)) * 0.5})`);

      el.vector!.style.transform =
        `translate(${x}px,${y}px) translate(-50%,-100%) rotate(${vecAngle}deg)`;

      const tipR = size * 0.44 * s;
      const a = ((vecAngle - 90) * Math.PI) / 180;
      el.vtip!.style.transform = at(
        x + Math.cos(a) * tipR,
        y + Math.sin(a) * tipR,
        ` scale(${1 + pulse * 0.6})`,
      );
      el.core!.style.transform = at(x, y);

      const showGate = preview && driveAmp > 0.4;
      const tint = showGate ? preview!.color : st.color;
      el.vector!.style.background = tint;
      el.vtip!.style.background = tint;
      el.label!.style.transform = `translate(${x + size * 0.7 * s}px,${y + size * 0.41 * s}px)`;
      el.label!.textContent = showGate ? `${gate} \u2192 ${preview!.label}` : st.label;
      el.label!.style.color = showGate ? "var(--c-gold)" : st.color;
      el.label!.style.opacity = String(0.7 + pulse * 0.3);

      const breathe = 1.28 + Math.sin(phase) * 0.16;
      el.halo!.style.transform = at(x, y, ` scale(${s * breathe})`);
      el.halo!.style.opacity = String(driveAmp * (0.5 - Math.sin(phase) * 0.22));

      raf = requestAnimationFrame(frame);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("blur", hide);
    document.addEventListener("pointerleave", hide);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("blur", hide);
      document.removeEventListener("pointerleave", hide);
      document.documentElement.classList.remove("qff-cursor-hidden");
    };
  }, [size, hideNativeCursor]);

  const ring: React.CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    width: size,
    height: size,
    borderRadius: "50%",
    border: "1px solid var(--c-sky)",
    willChange: "transform",
  };
  const dot = (d: number): React.CSSProperties => ({
    position: "absolute",
    left: 0,
    top: 0,
    width: d,
    height: d,
    borderRadius: "50%",
    willChange: "transform",
  });

  return (
    <div
      ref={layer}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: 0,
        transition: "opacity 0.18s ease",
      }}
    >
      <span ref={halo} style={{ ...ring, borderColor: "var(--c-gold)", opacity: 0 }} />
      <span ref={sphere} style={{ ...ring, opacity: 0.5 }} />
      <span ref={equator} style={{ ...ring, opacity: 0.4 }} />
      <span ref={meridian} style={{ ...ring, opacity: 0.28 }} />
      <span
        ref={vector}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1.5,
          height: size * 0.44,
          borderRadius: 1,
          background: "var(--c-gold)",
          transformOrigin: "50% 100%",
          willChange: "transform",
        }}
      />
      <span ref={vtip} style={{ ...dot(5), background: "var(--c-gold)" }} />
      <span ref={core} style={{ ...dot(3), background: "var(--c-fg)", opacity: 0.9 }} />
      <span
        ref={label}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          fontFamily: "var(--font-plex-mono), ui-monospace, monospace",
          fontSize: 11,
          letterSpacing: "0.1em",
          whiteSpace: "nowrap",
          color: "var(--c-gold)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
