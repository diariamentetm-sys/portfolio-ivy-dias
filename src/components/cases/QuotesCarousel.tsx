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
  className?: string;
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
  className = "",
}: QuotesCarouselProps) {
  const [index, setIndex] = useState(0);
  const total = quotes.length;
  if (!total) return null;

  const current = quotes[index];
  const counter = `${index + 1} / ${total}`;
  const atStart = index === 0;
  const atEnd = index === total - 1;

  function goPrev() {
    setIndex((value) => Math.max(0, value - 1));
  }

  function goNext() {
    setIndex((value) => Math.min(total - 1, value + 1));
  }

  const navBtnBase =
    "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const navBtnActive =
    "bg-accent text-white hover:bg-neutral-950 cursor-pointer";
  const navBtnDisabled =
    "bg-neutral-200 text-neutral-400 cursor-not-allowed";

  return (
    <div
      className={`bg-[#f2f2f2] px-5 py-12 md:px-10 md:py-16 lg:py-20 ${className}`.trim()}
    >
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[auto_minmax(0,1fr)] md:gap-14 lg:gap-20 items-start">
        <div className="flex gap-2.5 md:pt-1">
          <button
            type="button"
            onClick={goPrev}
            disabled={atStart}
            aria-label={prevLabel}
            aria-disabled={atStart}
            className={`${navBtnBase} ${atStart ? navBtnDisabled : navBtnActive}`}
          >
            <span aria-hidden className="text-lg leading-none">
              ←
            </span>
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={atEnd}
            aria-label={nextLabel}
            aria-disabled={atEnd}
            className={`${navBtnBase} ${atEnd ? navBtnDisabled : navBtnActive}`}
          >
            <span aria-hidden className="text-lg leading-none">
              →
            </span>
          </button>
        </div>

        <div className="min-w-0 md:max-w-3xl lg:max-w-4xl md:justify-self-end">
          <p className="font-mono text-[16px] tracking-[0.08em] text-accent">
            <span className="tabular-nums">{counter}</span>
            <span className="mx-2">·</span>
            <span>{label}</span>
          </p>

          <blockquote key={current.text} className="mt-6 md:mt-8">
            <p className="text-[1.65rem] sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold leading-[1.15] tracking-tight text-neutral-950 text-pretty">
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
              <p className="text-sm text-neutral-500 text-pretty">
                {current.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
