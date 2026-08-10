"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  /** Base position, used as the anchor the node drifts around. */
  bx: number;
  by: number;
  /** Independent drift parameters so no two nodes move in sync. */
  phase: number;
  speed: number;
  ampX: number;
  ampY: number;
  r: number;
  /** 0 = sky, 1 = gold, 2 = purple. */
  tint: number;
};

const TINTS = ["168, 200, 240", "227, 178, 60", "138, 99, 210"];

/**
 * Ambient "quantum field" behind the hero.
 *
 * Qubit nodes drift on independent sine paths. When two drift within a threshold
 * distance, an entanglement line fades in between them and decays as they separate.
 * There is no loop point, so it never visibly repeats.
 *
 * Performance and accessibility guards:
 *   - Disabled entirely under `prefers-reduced-motion: reduce`.
 *   - Paused when scrolled out of view (IntersectionObserver).
 *   - Paused when the tab is hidden (visibilitychange).
 *   - Node count scales down on small screens.
 *   - Purely decorative: aria-hidden, and no information exists only here.
 */
export function QuantumField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = true;
    let inView = true;

    const linkDistance = () => (width < 640 ? 120 : 165);

    function build() {
      const parent = canvas!.parentElement;
      if (!parent) return;

      const nextWidth = parent.clientWidth;
      const nextHeight = parent.clientHeight;

      // The parent can measure 0 when the component mounts in a background tab, or
      // inside a collapsed/hidden ancestor. Bail rather than baking in a 0-size
      // buffer — the ResizeObserver below rebuilds once real dimensions arrive.
      if (nextWidth === 0 || nextHeight === 0) return;

      width = nextWidth;
      height = nextHeight;

      // Cap DPR at 2 — beyond that the cost is real and the gain is not visible.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with area, capped so large monitors don't melt.
      const count = Math.min(46, Math.max(14, Math.round((width * height) / 26000)));

      nodes = Array.from({ length: count }, () => {
        const bx = Math.random() * width;
        const by = Math.random() * height;
        return {
          x: bx,
          y: by,
          bx,
          by,
          phase: Math.random() * Math.PI * 2,
          speed: 0.00016 + Math.random() * 0.00028,
          ampX: 24 + Math.random() * 52,
          ampY: 18 + Math.random() * 42,
          r: 1.1 + Math.random() * 2.1,
          tint: Math.random() < 0.16 ? 1 : Math.random() < 0.3 ? 2 : 0,
        };
      });

      // Paint immediately so the field is never blank, even before the first
      // animation frame (or if rAF is throttled and never fires).
      renderFrame(performance.now());
    }

    /**
     * Paints a single frame. Kept separate from the animation loop so build() can
     * paint immediately — otherwise the field stays blank until the first animation
     * frame, which never arrives if rAF is throttled (background tab, low power
     * mode, heavily loaded device).
     */
    function renderFrame(time: number) {
      if (width === 0 || height === 0) return;

      ctx!.clearRect(0, 0, width, height);

      // Advance positions along independent sine paths.
      for (const n of nodes) {
        const t = time * n.speed + n.phase;
        n.x = n.bx + Math.cos(t) * n.ampX;
        n.y = n.by + Math.sin(t * 1.31) * n.ampY;
      }

      // Entanglement lines between nodes that have drifted close together.
      const max = linkDistance();
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist >= max) continue;

          // Fade the line out as the pair separates.
          const strength = (1 - dist / max) ** 1.6;
          ctx!.strokeStyle = `rgba(120, 155, 220, ${strength * 0.4})`;
          ctx!.lineWidth = strength * 1.15;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }

      // Nodes on top of the lines, each with a soft halo.
      for (const n of nodes) {
        const tint = TINTS[n.tint];
        const halo = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 7);
        halo.addColorStop(0, `rgba(${tint}, 0.5)`);
        halo.addColorStop(1, `rgba(${tint}, 0)`);
        ctx!.fillStyle = halo;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r * 7, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.fillStyle = `rgba(${tint}, 0.95)`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    /** The animation loop: paint a frame, then queue the next one. */
    function loop(time: number) {
      if (!running) return;
      renderFrame(time);
      frame = requestAnimationFrame(loop);
    }

    function start() {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    build();
    frame = requestAnimationFrame(loop);

    // Rebuild whenever the parent's box changes, debounced — resize fires
    // continuously while dragging. A ResizeObserver is used rather than a window
    // resize listener so the canvas also recovers when it mounts at zero size
    // (background tab, hidden ancestor) and is only later given real dimensions.
    let resizeTimer: ReturnType<typeof setTimeout>;
    function scheduleBuild() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 180);
    }

    const resizeObserver = new ResizeObserver(scheduleBuild);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    // Don't animate what nobody is looking at.
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    function onVisibility() {
      if (document.hidden) {
        stop();
      } else if (inView) {
        // Coming back from a hidden tab is the case where dimensions may have been
        // unavailable at mount, so re-measure before resuming.
        build();
        start();
      }
    }

    // If the user turns reduced-motion on mid-session, stop and clear.
    function onMotionChange(e: MediaQueryListEvent) {
      if (e.matches) {
        stop();
        ctx!.clearRect(0, 0, width, height);
      } else {
        start();
      }
    }

    document.addEventListener("visibilitychange", onVisibility);
    reduceMotion.addEventListener("change", onMotionChange);

    return () => {
      stop();
      clearTimeout(resizeTimer);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
