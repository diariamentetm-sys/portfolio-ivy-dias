import { useRef, useState, type PointerEvent } from "react";

const TONES = [
  "post-it-yellow",
  "post-it-mint",
  "post-it-coral",
  "post-it-blue",
  "post-it-lavender",
  "post-it-peach",
] as const;

type TrailNote = {
  id: number;
  text: string;
  tone: (typeof TONES)[number];
  x: number;
  y: number;
  rotate: number;
};

type HeroTitleNotesProps = {
  titleBefore: string;
  titleAccent: string;
  notes: string[];
};

const SPAWN_DISTANCE = 72;
const NOTE_LIFETIME_MS = 900;
const MAX_ACTIVE = 10;

/**
 * Cursor trail over the hero headline — same interaction language as
 * benjamincreative.me "My Recently Selected Works" image trail, but with
 * handwritten post-it words instead of project thumbnails.
 */
export function HeroTitleNotes({
  titleBefore,
  titleAccent,
  notes,
}: HeroTitleNotesProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const noteIndex = useRef(0);
  const idRef = useRef(0);
  const [trail, setTrail] = useState<TrailNote[]>([]);
  const [hot, setHot] = useState(false);

  function canTrail() {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(hover: none)").matches) return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return false;
    }
    return true;
  }

  function spawnAt(clientX: number, clientY: number) {
    const wrap = wrapRef.current;
    if (!wrap || notes.length === 0) return;

    const rect = wrap.getBoundingClientRect();
    const text = notes[noteIndex.current % notes.length];
    noteIndex.current += 1;

    const id = ++idRef.current;
    const next: TrailNote = {
      id,
      text,
      tone: TONES[id % TONES.length],
      x: clientX - rect.left,
      y: clientY - rect.top,
      rotate: Math.round(Math.random() * 28 - 14),
    };

    setTrail((current) => [...current.slice(-(MAX_ACTIVE - 1)), next]);
    window.setTimeout(() => {
      setTrail((current) => current.filter((item) => item.id !== id));
    }, NOTE_LIFETIME_MS);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !canTrail()) return;

    const point = { x: event.clientX, y: event.clientY };
    const prev = lastPoint.current;
    if (!prev) {
      lastPoint.current = point;
      spawnAt(point.x, point.y);
      return;
    }

    const distance = Math.hypot(point.x - prev.x, point.y - prev.y);
    if (distance < SPAWN_DISTANCE) return;

    lastPoint.current = point;
    spawnAt(point.x, point.y);
  }

  function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    setHot(true);
    lastPoint.current = { x: event.clientX, y: event.clientY };
  }

  function handlePointerLeave() {
    setHot(false);
    lastPoint.current = null;
  }

  return (
    <div
      ref={wrapRef}
      className="hero-title-notes relative isolate"
      data-hot={hot ? "true" : "false"}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <h1 className="hero-h1 relative z-0">
        {titleBefore}{" "}
        <span className="text-accent">{titleAccent}</span>
      </h1>

      <div
        className="pointer-events-none absolute inset-0 z-20 overflow-visible"
        aria-hidden="true"
      >
        {trail.map((item) => (
          <span
            key={item.id}
            className="hero-trail-note"
            style={{ left: item.x, top: item.y }}
          >
            <span
              className={`post-it post-it-scribble ${item.tone}`}
              style={{ transform: `rotate(${item.rotate}deg)` }}
            >
              {item.text}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
