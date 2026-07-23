import { useState } from "react";

export type QuoteSlide = {
  text: string;
  name: string;
  role: string;
};

type QuotesCarouselProps = {
  label: string;
  quotes: readonly QuoteSlide[];
  prevLabel: string;
  nextLabel: string;
};

function initialsFromName(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function QuotesCarousel({
  label,
  quotes,
  prevLabel,
  nextLabel,
}: QuotesCarouselProps) {
  const [index, setIndex] = useState(0);
  const total = quotes.length;
  if (!total) return null;

  const current = quotes[index];
  const counter = `${String(index + 1).padStart(1, "0")} / ${total}`;

  function goPrev() {
    setIndex((value) => (value - 1 + total) % total);
  }

  function goNext() {
    setIndex((value) => (value + 1) % total);
  }

  return (
    <div className="mt-8 bg-neutral-100/90 -mx-5 px-5 py-10 md:mx-0 md:rounded-2xl md:px-10 md:py-14">
      <div className="grid gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-12 lg:gap-20 items-start">
        <div className="flex gap-2 md:pt-1">
          <button
            type="button"
            onClick={goPrev}
            aria-label={prevLabel}
            className="inline-flex h-11 w-11 items-center justify-center border border-neutral-950 text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span aria-hidden className="text-lg leading-none">
              ←
            </span>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label={nextLabel}
            className="inline-flex h-11 w-11 items-center justify-center border border-neutral-950 text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span aria-hidden className="text-lg leading-none">
              →
            </span>
          </button>
        </div>

        <div className="min-w-0 md:max-w-3xl md:ml-auto md:mr-0 lg:max-w-4xl">
          <p className="font-mono text-xs tracking-[0.08em] text-accent">
            <span className="tabular-nums">{counter}</span>
            <span className="mx-2">·</span>
            <span>{label}</span>
          </p>

          <blockquote key={current.text} className="mt-6 md:mt-8">
            <p className="text-[1.65rem] sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] tracking-tight text-neutral-950 text-pretty">
              “{current.text}”
            </p>
          </blockquote>

          <div className="mt-8 flex items-center gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-sm font-semibold text-white"
              aria-hidden
            >
              {initialsFromName(current.name)}
            </div>
            <div className="min-w-0">
              <p className="text-base font-medium text-neutral-950">
                {current.name}
              </p>
              <p className="text-sm text-neutral-500">{current.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
