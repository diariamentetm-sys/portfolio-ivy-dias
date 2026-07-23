import type { ReactNode } from "react";

type CaseSectionProps = {
  number: string;
  kicker: string;
  title: string;
  children: ReactNode;
  inverted?: boolean;
};

export function CaseSection({
  number,
  kicker,
  title,
  children,
  inverted = false,
}: CaseSectionProps) {
  return (
    <section
      className={`section-narrative ${inverted ? "section-inverted border-neutral-800" : ""}`}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-[minmax(0,80px)_1fr] md:grid-cols-[minmax(0,120px)_1fr] gap-4 md:gap-10">
        <div
          className={`text-5xl md:text-7xl font-extrabold leading-[0.8] ${
            inverted ? "text-white/10" : "text-neutral-200"
          }`}
        >
          {number}
        </div>
        <div>
          <p className={`eyebrow mb-3.5 ${inverted ? "text-white/50" : "text-accent"}`}>
            {kicker}
          </p>
          <h2
            className={`text-section-title max-w-3xl ${
              inverted ? "text-white" : "text-neutral-950"
            }`}
          >
            {title}
          </h2>
          <div className="mt-5">{children}</div>
        </div>
      </div>
    </section>
  );
}

type CaseBlockSectionProps = {
  label: string;
  title: string;
  children: ReactNode;
  inverted?: boolean;
};

export function CaseBlockSection({
  label,
  title,
  children,
  inverted = false,
}: CaseBlockSectionProps) {
  return (
    <section
      className={`section-narrative ${inverted ? "section-inverted border-neutral-800" : ""}`}
    >
      <div className="max-w-5xl mx-auto">
        <p className={`eyebrow mb-3.5 ${inverted ? "text-white/50" : ""}`}>
          {label}
        </p>
        <h2
          className={`text-section-title max-w-2xl ${
            inverted ? "text-white" : "text-neutral-950"
          }`}
        >
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export function CaseQuote({
  label = "Aprendizado",
  quote,
  maxWidth = "max-w-xl",
  children,
}: {
  label?: string;
  quote: string;
  maxWidth?: string;
  children?: ReactNode;
}) {
  return (
    <section className="section-inverted py-16 md:py-28">
      <div className="max-w-5xl mx-auto">
        <p className="eyebrow mb-6 text-white/50">{label}</p>
        <blockquote
          className={`pl-6 border-l-[3px] border-accent text-2xl md:text-4xl lg:text-5xl font-bold leading-snug text-white text-pretty ${maxWidth}`}
        >
          “{quote}”
        </blockquote>
        {children ? (
          <div
            className={`mt-8 ${maxWidth} text-base md:text-lg leading-relaxed text-white/70`}
          >
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function CaseImage({
  src,
  alt,
  className = "",
  fill = false,
  aspect = "aspect-video",
  priority = false,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  aspect?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  if (fill) {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-2xl shadow-card ${aspect} ${className}`}
      >
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 block h-full w-full object-cover object-center"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          width={width}
          height={height}
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`block h-auto w-full rounded-2xl shadow-card bg-white ${className}`}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      width={width ?? 1600}
      height={height ?? 900}
    />
  );
}

export function ImagePlaceholder({ children }: { children: ReactNode }) {
  return (
    <div className="card-ui p-8 md:p-10 min-h-[200px] flex items-center justify-center">
      <span className="eyebrow text-center">{children}</span>
    </div>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 body-md text-neutral-950">
          <span className="text-accent shrink-0">●</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function RuleBarChart({
  title,
  items,
}: {
  title: string;
  items: { t: string; v: number; pct: string }[];
}) {
  return (
    <div>
      <p className="eyebrow mb-3.5">{title}</p>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.t}
            className="grid grid-cols-[1fr_120px_auto] gap-3 items-center"
          >
            <div className="text-sm text-neutral-950">{item.t}</div>
            <div className="h-1.5 rounded-full bg-neutral-200">
              <div
                className="h-1.5 rounded-full bg-accent"
                style={{ width: item.pct }}
              />
            </div>
            <div className="text-sm font-bold text-neutral-950 text-right">
              {item.v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="eyebrow mb-1.5">{label}</div>
      <div className="text-[15px] text-neutral-950 font-medium">{value}</div>
    </div>
  );
}
