"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

/** A compact, animated Bloch sphere that previews H, X, and Z gate actions. */
type GateName = "H" | "X" | "Z";

const STATES = [
  { label: "|0⟩", angle: 0, spin: 0.5, color: "var(--c-gold)" },
  { label: "|1⟩", angle: 180, spin: 2.4, color: "var(--c-purple)" },
  { label: "|+⟩", angle: 90, spin: 1.2, color: "var(--c-sky)" },
  { label: "|−⟩", angle: -90, spin: -1.8, color: "var(--c-gold-strong)" },
] as const;

const GATES: Record<GateName, readonly [number, number, number, number]> = {
  H: [2, 3, 0, 1],
  X: [1, 0, 2, 3],
  Z: [0, 1, 3, 2],
};

const HIT_SELECTOR = 'a, button, summary, [role="button"], [data-gate]';
const TEXT_ENTRY_SELECTOR = [
  "textarea",
  '[contenteditable]:not([contenteditable="false"])',
  '[role="textbox"]',
  'input:not([type="button"]):not([type="checkbox"]):not([type="color"]):not([type="file"]):not([type="hidden"]):not([type="image"]):not([type="radio"]):not([type="range"]):not([type="reset"]):not([type="submit"])',
].join(", ");

export type BlochCursorProps = {
  size?: number;
  hideNativeCursor?: boolean;
};

export function BlochCursor({ size = 34, hideNativeCursor = true }: BlochCursorProps) {
  const [enabled, setEnabled] = useState(false);
  const layer = useRef<HTMLDivElement | null>(null);
  const halo = useRef<HTMLSpanElement | null>(null);
  const sphere = useRef<HTMLSpanElement | null>(null);
  const equator = useRef<HTMLSpanElement | null>(null);
  const meridian = useRef<HTMLSpanElement | null>(null);
  const vector = useRef<HTMLSpanElement | null>(null);
  const vectorTip = useRef<HTMLSpanElement | null>(null);
  const core = useRef<HTMLSpanElement | null>(null);
  const label = useRef<HTMLSpanElement | null>(null);

  // Honor input-device and motion preferences live, not only on initial load.
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(finePointer.matches && !reducedMotion.matches);

    update();
    finePointer.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);

    return () => {
      finePointer.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const layerNode = layer.current;
    const haloNode = halo.current;
    const sphereNode = sphere.current;
    const equatorNode = equator.current;
    const meridianNode = meridian.current;
    const vectorNode = vector.current;
    const vectorTipNode = vectorTip.current;
    const coreNode = core.current;
    const labelNode = label.current;
    if (
      !layerNode ||
      !haloNode ||
      !sphereNode ||
      !equatorNode ||
      !meridianNode ||
      !vectorNode ||
      !vectorTipNode ||
      !coreNode ||
      !labelNode
    ) {
      return;
    }

    const el = {
      layer: layerNode,
      halo: haloNode,
      sphere: sphereNode,
      equator: equatorNode,
      meridian: meridianNode,
      vector: vectorNode,
      vectorTip: vectorTipNode,
      core: coreNode,
      label: labelNode,
    };

    const root = document.documentElement;
    const setNativeHidden = (hidden: boolean) => {
      if (hideNativeCursor) root.classList.toggle("qff-cursor-hidden", hidden);
    };

    // The class is first applied from `onMove`, after this complete visual layer is
    // mounted and positioned. Until then the platform cursor remains available.

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let inside = false;
    let usingTextCursor = false;
    let hover = 0;
    let gate: GateName | null = null;
    let stateIndex = 0;
    let vectorAngle = 0;
    let spin = 0;
    let pulse = 0;
    let driveAmplitude = 0;
    let phase = 0;
    let animationFrame = 0;
    let pageVisible = !document.hidden;

    const readGate = (node: Element | null): GateName | null => {
      const value = node instanceof HTMLElement ? node.dataset.gate : undefined;
      return value === "H" || value === "X" || value === "Z" ? value : null;
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      const target = event.target instanceof Element ? event.target : null;
      usingTextCursor = Boolean(target?.closest(TEXT_ENTRY_SELECTOR));
      setNativeHidden(!usingTextCursor);

      // Text inputs and editable regions retain the platform I-beam cursor.
      if (usingTextCursor) {
        inside = false;
        hover = 0;
        gate = null;
        el.layer.style.opacity = "0";
        return;
      }

      if (!inside) {
        inside = true;
        x = targetX;
        y = targetY;
        el.layer.style.opacity = "1";
      }

      const hit = target?.closest(HIT_SELECTOR) ?? null;
      hover = hit ? 1 : 0;
      gate = readGate(hit);
    };

    const hide = () => {
      inside = false;
      hover = 0;
      gate = null;
      el.layer.style.opacity = "0";
      setNativeHidden(false);
    };

    const onDown = () => {
      if (usingTextCursor) return;
      const mapping = gate ? GATES[gate] : null;
      if (!mapping) return;
      stateIndex = mapping[stateIndex];
      pulse = 1;
    };

    const frame = () => {
      if (!pageVisible) {
        animationFrame = 0;
        return;
      }

      const state = STATES[stateIndex];
      const mapping = gate ? GATES[gate] : null;
      const preview = mapping ? STATES[mapping[stateIndex]] : null;

      x += (targetX - x) * 0.55;
      y += (targetY - y) * 0.55;
      driveAmplitude += ((hover ? 1 : 0) - driveAmplitude) * 0.12;
      phase = (phase + 0.045) % (Math.PI * 2);
      pulse *= 0.9;
      spin += state.spin * (1 + driveAmplitude * 1.6);

      let goal: number = state.angle;
      if (preview) {
        let delta = preview.angle - state.angle;
        while (delta > 180) delta -= 360;
        while (delta < -180) delta += 360;
        const invariant = Math.abs(delta) < 1;
        goal =
          state.angle +
          delta * (0.86 * driveAmplitude) +
          Math.sin(phase * 2) * (invariant ? 7 : 3) * driveAmplitude;
      }

      let angleDelta = goal - vectorAngle;
      while (angleDelta > 180) angleDelta -= 360;
      while (angleDelta < -180) angleDelta += 360;
      vectorAngle += angleDelta * (hover ? 0.34 : 0.16);

      const scale = (hover ? 1.22 : 1) * (1 + pulse * 0.28);
      const at = (px: number, py: number, extra = "") =>
        `translate(${px}px,${py}px) translate(-50%,-50%)${extra}`;
      const radians = (spin * Math.PI) / 180;

      el.sphere.style.transform = at(x, y, ` scale(${scale})`);
      el.sphere.style.opacity = String(0.5 + driveAmplitude * 0.3);
      el.equator.style.transform = at(
        x,
        y,
        ` scale(${scale}) scaleY(${0.16 + Math.abs(Math.sin(radians)) * 0.5})`,
      );
      el.meridian.style.transform = at(
        x,
        y,
        ` scale(${scale}) scaleX(${0.16 + Math.abs(Math.cos(radians)) * 0.5})`,
      );
      el.vector.style.transform =
        `translate(${x}px,${y}px) translate(-50%,-100%) rotate(${vectorAngle}deg)`;

      const tipRadius = size * 0.44 * scale;
      const tipAngle = ((vectorAngle - 90) * Math.PI) / 180;
      el.vectorTip.style.transform = at(
        x + Math.cos(tipAngle) * tipRadius,
        y + Math.sin(tipAngle) * tipRadius,
        ` scale(${1 + pulse * 0.6})`,
      );
      el.core.style.transform = at(x, y);

      const showGate = preview && driveAmplitude > 0.4;
      const tint = showGate ? preview.color : state.color;
      el.vector.style.background = tint;
      el.vectorTip.style.background = tint;
      el.label.style.transform =
        `translate(${x + size * 0.7 * scale}px,${y + size * 0.41 * scale}px)`;
      el.label.textContent = showGate ? `${gate} → ${preview.label}` : state.label;
      el.label.style.color = showGate ? "var(--c-gold)" : state.color;
      el.label.style.opacity = String(0.7 + pulse * 0.3);

      const breathe = 1.28 + Math.sin(phase) * 0.16;
      el.halo.style.transform = at(x, y, ` scale(${scale * breathe})`);
      el.halo.style.opacity = String(
        driveAmplitude * (0.5 - Math.sin(phase) * 0.22),
      );

      animationFrame = requestAnimationFrame(frame);
    };

    const startAnimation = () => {
      if (pageVisible && animationFrame === 0) {
        animationFrame = requestAnimationFrame(frame);
      }
    };

    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (pageVisible) {
        startAnimation();
      } else {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        hide();
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("blur", hide);
    document.addEventListener("pointerleave", hide);
    document.addEventListener("visibilitychange", onVisibilityChange);
    startAnimation();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("blur", hide);
      document.removeEventListener("pointerleave", hide);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      setNativeHidden(false);
    };
  }, [enabled, hideNativeCursor, size]);

  if (!enabled) return null;

  const ring: CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    width: size,
    height: size,
    borderRadius: "50%",
    border: "1px solid var(--c-sky)",
    willChange: "transform",
  };
  const dot = (diameter: number): CSSProperties => ({
    position: "absolute",
    left: 0,
    top: 0,
    width: diameter,
    height: diameter,
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
      <span ref={vectorTip} style={{ ...dot(5), background: "var(--c-gold)" }} />
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
