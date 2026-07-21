import { specialtyPostItStyles } from "../../data/portfolio";

type SpecialtyItem = {
  num: string;
  title: string;
  desc: string;
};

type SpecialtyStackProps = {
  items: SpecialtyItem[];
};

const CARD_ROTATIONS = [-2.2, 1.8, -1.4, 2.4, -1.8, 1.2];

/**
 * Cascading sticky post-its: each card pins a little lower than the last
 * so the deck builds naturally — no tall empty runway, no JS scrubbing.
 */
export function SpecialtyStack({ items }: SpecialtyStackProps) {
  return (
    <div className="relative mt-6 md:mt-8 max-w-2xl mx-auto flex flex-col gap-5 md:gap-6">
      {items.map((item, index) => {
        const postIt = specialtyPostItStyles[index];
        const rotate = CARD_ROTATIONS[index] ?? 0;
        // Cascade under the nav: each card sticks slightly lower → soft pile
        const topRem = 6.5 + index * 0.65;

        return (
          <div
            key={item.num}
            className="sticky"
            style={{
              top: `${topRem}rem`,
              zIndex: index + 1,
            }}
          >
            <article
              className={`post-it !h-auto w-full ${postIt?.tone ?? "post-it-yellow"}`}
              style={{
                transform: `rotate(${rotate}deg)`,
                // Keep shadow soft-transition; never transition transform (fights scroll)
                transition: "box-shadow 0.35s ease",
                boxShadow:
                  "2px 3px 0 rgba(10,10,10,0.04), 10px 22px 36px rgba(10,10,10,0.14)",
              }}
            >
              <div className="font-mono text-sm font-medium text-neutral-800/70">
                {item.num}
              </div>
              <h3 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-neutral-950 text-balance">
                {item.title}
              </h3>
              <p className="mt-4 text-[15px] md:text-base leading-relaxed text-neutral-700 text-pretty">
                {item.desc}
              </p>
            </article>
          </div>
        );
      })}
    </div>
  );
}
