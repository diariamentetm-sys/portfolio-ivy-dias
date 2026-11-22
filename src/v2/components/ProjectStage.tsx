import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { Link } from "react-router-dom";
import { useLocalizedPath } from "../../i18n/useLocalizedPath";
import { centerLayout, layoutWord, type LayoutCell } from "../glyphs/wordLayout";
import {
  lerp,
  lerpColor,
  matchPixels,
  smoothstep,
  type MatchedPixel,
} from "../motion/pixelMatch";
import {
  clearStageSession,
  readStageSession,
  saveStageSession,
} from "../motion/stageSession";
import { consumeExitZoom, v2Motion } from "../motion/timings";
import { v2Theme } from "../tokens/theme";
import { PixelZoom } from "./PixelZoom";

export type StageItem = {
  id: string;
  text: string;
  ink: string;
  stageColor: string;
  summary: string;
  /** When set, wordmark is a real case link. */
  slug?: string;
  /** Optional isolated v2 case path (e.g. /v2/cases/claro). */
  v2Path?: string;
};

type ProjectStageProps = {
  stages: StageItem[];
  exploreLabel: string;
  reducedMotionLabel: string;
};

const UNIT = 10;
const GAP = v2Theme.pixelGap;
const MORPH_RATIO = 0.6;

type SegmentPlan = {
  pairs: MatchedPixel[];
  fromColor: string;
  toColor: string;
  fromStage: StageItem;
  toStage: StageItem;
};

function clamp01(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function buildPlans(stages: StageItem[]): {
  plans: SegmentPlan[];
  boxW: number;
  boxH: number;
  poolSize: number;
  centered: LayoutCell[][];
} {
  const layouts = stages.map((stage) => layoutWord(stage.text, stage.ink));
  const boxW = Math.max(...layouts.map((l) => l.width));
  const boxH = Math.max(...layouts.map((l) => l.height));
  const centered = layouts.map((layout) => centerLayout(layout, boxW, boxH));
  const poolSize = Math.max(...centered.map((cells) => cells.length), 1);

  const plans: SegmentPlan[] = [];
  for (let i = 0; i < stages.length - 1; i++) {
    plans.push({
      pairs: matchPixels(centered[i], centered[i + 1]),
      fromColor: stages[i].stageColor,
      toColor: stages[i + 1].stageColor,
      fromStage: stages[i],
      toStage: stages[i + 1],
    });
  }

  return { plans, boxW, boxH, poolSize, centered };
}

/**
 * @description Sticky scroll stage: persistent pixels morph between names.
 */
export function ProjectStage({
  stages,
  exploreLabel,
  reducedMotionLabel,
}: ProjectStageProps) {
  const lp = useLocalizedPath();
  const trackRef = useRef<HTMLDivElement>(null);
  const rectRefs = useRef<(SVGRectElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const restoredSessionRef = useRef(false);
  const hoverLiftRef = useRef(0);
  const hoverTargetRef = useRef(0);
  const hoverFrameRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [caption, setCaption] = useState(stages[0]);
  const [captionOpacity, setCaptionOpacity] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [zoom, setZoom] = useState<{
    color: string;
    to?: string;
    origin: { x: number; y: number };
    mode: "expand" | "collapse";
  } | null>(null);
  const [exploreHover, setExploreHover] = useState(false);

  const { plans, boxW, boxH, poolSize, centered } = useMemo(
    () => buildPlans(stages),
    [stages],
  );

  const svgW = boxW * UNIT + Math.max(boxW - 1, 0) * GAP;
  const svgH = boxH * UNIT + Math.max(boxH - 1, 0) * GAP;
  const segmentCount = Math.max(stages.length - 1, 1);

  const setActiveSafe = (index: number) => {
    if (activeIndexRef.current === index) return;
    activeIndexRef.current = index;
    setActiveIndex(index);
  };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const exitColor = consumeExitZoom();
    if (!exitColor || reducedMotion) return;
    setZoom({
      color: exitColor,
      mode: "collapse",
      origin: {
        x: window.innerWidth / 2,
        y: window.innerHeight * 0.42,
      },
    });
  }, [reducedMotion]);

  useEffect(() => {
    const saved = readStageSession();
    if (!saved) return;
    restoredSessionRef.current = true;
    const id = window.requestAnimationFrame(() => {
      window.scrollTo({ top: saved.scrollY, behavior: "auto" });
      setActiveSafe(
        Math.min(Math.max(saved.activeIndex, 0), stages.length - 1),
      );
      clearStageSession();
    });
    return () => window.cancelAnimationFrame(id);
  }, [stages.length]);

  useEffect(() => {
    const next = stages[activeIndex] ?? stages[0];
    if (!next || next.id === caption?.id) return;
    setCaptionOpacity(0);
    const timer = window.setTimeout(() => {
      setCaption(next);
      setCaptionOpacity(1);
    }, v2Motion.legendFadeMs);
    return () => window.clearTimeout(timer);
  }, [activeIndex, caption?.id, stages]);

  const persistBeforeLeave = () => {
    saveStageSession({
      scrollY: window.scrollY,
      activeIndex: activeIndexRef.current,
    });
  };

  const resolveCaseHref = (stage: StageItem) =>
    stage.v2Path ?? (stage.slug ? `/cases/${stage.slug}` : "/v2");

  const tickHover = () => {
    hoverFrameRef.current = 0;
    const current = hoverLiftRef.current;
    const target = hoverTargetRef.current;
    const next = current + (target - current) * 0.28;
    hoverLiftRef.current = Math.abs(target - next) < 0.01 ? target : next;
    if (Math.abs(hoverLiftRef.current - target) > 0.01) {
      hoverFrameRef.current = window.requestAnimationFrame(tickHover);
    }
  };

  const setHoverTarget = (value: number) => {
    hoverTargetRef.current = value;
    setExploreHover(value > 0.5);
    if (!hoverFrameRef.current) {
      hoverFrameRef.current = window.requestAnimationFrame(tickHover);
    }
  };

  const openCase = (stage: StageItem, event: MouseEvent<HTMLAnchorElement>) => {
    persistBeforeLeave();
    if (!stage.v2Path || reducedMotion) return;
    event.preventDefault();
    setZoom({
      color: stage.stageColor,
      to: lp(resolveCaseHref(stage)),
      origin: { x: event.clientX, y: event.clientY },
      mode: "expand",
    });
  };

  useEffect(() => {
    if (reducedMotion) return;

    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    let introProgress = 0;
    let introDone = false;
    let visible = true;
    const introStart = performance.now();
    const skipIntro = restoredSessionRef.current;

    const paint = (pairs: MatchedPixel[], t: number) => {
      const midLift = Math.sin(Math.PI * t) * 0.35;
      const hover = hoverLiftRef.current;
      for (let i = 0; i < poolSize; i++) {
        const el = rectRefs.current[i];
        if (!el) continue;
        const pair = pairs[i];
        if (!pair) {
          el.setAttribute("opacity", "0");
          continue;
        }

        const from = pair.from;
        const to = pair.to;
        let x: number;
        let y: number;
        let fill: string;
        let opacity = 1;

        if (from && to) {
          x = lerp(from.x, to.x, t);
          y = lerp(from.y, to.y, t) - midLift;
          fill = lerpColor(from.fill, to.fill, t);
        } else if (from && !to) {
          x = from.x;
          y = from.y + t * 1.2;
          fill = from.fill;
          opacity = 1 - t;
        } else if (!from && to) {
          x = to.x;
          y = to.y - (1 - t) * 1.2;
          fill = to.fill;
          opacity = t;
        } else {
          opacity = 0;
          x = 0;
          y = 0;
          fill = v2Theme.colors.ink;
        }

        if (hover > 0 && i % 3 === 0) {
          y -= hover * 0.45;
        }

        el.setAttribute("x", String(x * (UNIT + GAP)));
        el.setAttribute("y", String(y * (UNIT + GAP)));
        el.setAttribute("fill", fill);
        el.setAttribute("opacity", String(opacity));
      }
    };

    const paintRest = (cells: LayoutCell[], introT = 1) => {
      const hover = hoverLiftRef.current;
      for (let i = 0; i < poolSize; i++) {
        const el = rectRefs.current[i];
        if (!el) continue;
        const cell = cells[i];
        if (!cell) {
          el.setAttribute("opacity", "0");
          continue;
        }
        const appear = smoothstep(clamp01((introT - i / poolSize * 0.35) / 0.65));
        let y = cell.y + (1 - appear) * 1.4;
        if (hover > 0 && i % 3 === 0) {
          y -= hover * 0.45;
        }
        el.setAttribute("x", String(cell.x * (UNIT + GAP)));
        el.setAttribute("y", String(y * (UNIT + GAP)));
        el.setAttribute("fill", cell.fill);
        el.setAttribute("opacity", String(appear));
      }
    };

    const update = (now = performance.now()) => {
      frame = 0;
      if (!visible) return;

      if (!introDone && !skipIntro) {
        introProgress = clamp01((now - introStart) / v2Motion.introMs);
        paintRest(centered[0], introProgress);
        track.style.background = stages[0].stageColor;
        setActiveSafe(0);
        if (introProgress < 1) {
          frame = window.requestAnimationFrame(update);
          return;
        }
        introDone = true;
      }

      const rect = track.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      const total = Math.max(track.offsetHeight - viewH, 1);
      const scrolled = clamp01(-rect.top / total);
      const rawSegment = scrolled * segmentCount;
      const segmentIndex = Math.min(Math.floor(rawSegment), segmentCount - 1);
      const local = rawSegment - segmentIndex;

      const plan = plans[segmentIndex];
      if (!plan) {
        paintRest(centered[stages.length - 1]);
        setActiveSafe(stages.length - 1);
        track.style.background = stages[stages.length - 1].stageColor;
        return;
      }

      if (local < MORPH_RATIO) {
        const t = smoothstep(local / MORPH_RATIO);
        paint(plan.pairs, t);
        const stageIdx = t < 0.5 ? segmentIndex : segmentIndex + 1;
        setActiveSafe(stageIdx);
        track.style.background = lerpColor(plan.fromColor, plan.toColor, t);
      } else {
        paintRest(centered[segmentIndex + 1]);
        setActiveSafe(segmentIndex + 1);
        track.style.background = plan.toColor;
      }

      if (hoverLiftRef.current !== hoverTargetRef.current && !hoverFrameRef.current) {
        hoverFrameRef.current = window.requestAnimationFrame(tickHover);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) onScroll();
      },
      { threshold: 0.01 },
    );
    io.observe(track);

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (hoverFrameRef.current) window.cancelAnimationFrame(hoverFrameRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
    };
  }, [centered, plans, poolSize, reducedMotion, segmentCount, stages]);

  const active = stages[activeIndex] ?? stages[0];
  const shown = caption ?? active;

  if (reducedMotion) {
    return (
      <section
        id="work"
        style={{
          padding: "var(--v2-space-5) var(--v2-gutter) var(--v2-space-6)",
        }}
      >
        <p style={{ marginBottom: "var(--v2-space-4)", fontSize: 13, opacity: 0.7 }}>
          {reducedMotionLabel}
        </p>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 32 }}>
          {stages.map((stage) => (
            <li key={stage.id}>
              <p
                style={{
                  margin: "0 0 8px",
                  fontFamily: "var(--v2-font-display)",
                  fontSize: "clamp(2rem, 8vw, 4rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: stage.ink === v2Theme.colors.ink ? v2Theme.colors.ink : stage.ink,
                }}
              >
                {stage.text}
              </p>
              <p style={{ margin: "0 0 12px", maxWidth: "42ch" }}>{stage.summary}</p>
              {stage.slug ? (
                <Link
                  to={lp(resolveCaseHref(stage))}
                  onClick={(event) => openCase(stage, event)}
                  style={{
                    fontWeight: 600,
                    borderBottom: "2px solid currentColor",
                    minHeight: 44,
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  {exploreLabel} →
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section
      id="work"
      ref={trackRef}
      style={{
        height: `${stages.length * 100}svh`,
        position: "relative",
        background: stages[0]?.stageColor ?? v2Theme.colors.canvas,
        transition: "none",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--v2-space-5) var(--v2-gutter)",
          gap: "var(--v2-space-4)",
        }}
      >
        <div
          style={{
            width: "min(90vw, 1100px)",
            transition: `transform ${v2Motion.hoverMs}ms ${v2Motion.easeSoft}`,
            transform: exploreHover ? "translateY(-2px)" : "none",
          }}
          onMouseEnter={() => active.slug && setHoverTarget(1)}
          onMouseLeave={() => setHoverTarget(0)}
        >
          <svg
            viewBox={`0 0 ${svgW} ${svgH}`}
            width="100%"
            height="auto"
            role="img"
            aria-label={active.text}
          >
            <title>{active.text}</title>
            {Array.from({ length: poolSize }, (_, index) => (
              <rect
                key={index}
                ref={(el) => {
                  rectRefs.current[index] = el;
                }}
                x={0}
                y={0}
                width={UNIT}
                height={UNIT}
                fill={v2Theme.colors.ink}
                opacity={0}
              />
            ))}
          </svg>
        </div>

        <div
          style={{
            textAlign: "center",
            maxWidth: "36rem",
            minHeight: 88,
            opacity: captionOpacity,
            transition: `opacity ${v2Motion.legendFadeMs}ms ${v2Motion.easeSoft}`,
          }}
        >
          <p style={{ margin: "0 0 12px", fontSize: 16 }}>{shown.summary}</p>
          {shown.slug ? (
            <Link
              to={lp(resolveCaseHref(shown))}
              onClick={(event) => openCase(shown, event)}
              onMouseEnter={() => setHoverTarget(1)}
              onMouseLeave={() => setHoverTarget(0)}
              onFocus={() => setHoverTarget(1)}
              onBlur={() => setHoverTarget(0)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: 44,
                fontWeight: 600,
                fontSize: 15,
                borderBottom: "2px solid currentColor",
                transition: `letter-spacing ${v2Motion.hoverMs}ms ${v2Motion.easeSoft}`,
                letterSpacing: exploreHover ? "0.02em" : "0",
              }}
            >
              {exploreLabel} →
            </Link>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <p
            aria-live="polite"
            style={{
              margin: 0,
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            {activeIndex + 1} / {stages.length}
          </p>
          <ol
            aria-label="Stages"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 4,
              listStyle: "none",
              margin: 0,
              padding: 0,
              maxWidth: "90vw",
            }}
          >
            {stages.map((stage, index) => (
              <li key={stage.id}>
                <button
                  type="button"
                  aria-label={stage.text}
                  aria-current={index === activeIndex ? "true" : undefined}
                  onClick={() => {
                    const track = trackRef.current;
                    if (!track) return;
                    const viewH = window.innerHeight || 1;
                    const total = Math.max(track.offsetHeight - viewH, 1);
                    const target =
                      track.offsetTop +
                      (index / Math.max(stages.length - 1, 1)) * total;
                    window.scrollTo({ top: target, behavior: "smooth" });
                  }}
                  style={{
                    padding: 0,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    minWidth: 36,
                    minHeight: 36,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 8,
                      height: 8,
                      background:
                        index === activeIndex ? v2Theme.colors.ink : "transparent",
                      border: `1px solid ${v2Theme.colors.ink}`,
                      transition: `background ${v2Motion.hoverMs}ms ${v2Motion.easeSoft}`,
                    }}
                  />
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
      {zoom ? (
        <PixelZoom
          color={zoom.color}
          to={zoom.to}
          origin={zoom.origin}
          mode={zoom.mode}
          onDone={() => setZoom(null)}
        />
      ) : null}
    </section>
  );
}
