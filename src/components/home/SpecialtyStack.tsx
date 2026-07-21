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
 * Sticky post-it deck (01 → 06):
 * each card pins under the nav while the next slides over it.
 * Short dwell height keeps the layout tight — no giant empty canvas.
 */
export function SpecialtyStack({ items }: SpecialtyStackProps) {
  return (
    <div className="relative mt-6 md:mt-8 max-w-2xl mx-auto">
      {items.map((item, index) => {
        const postIt = specialtyPostItStyles[index];
        const isLast = index === items.length - 1;
        const rotate = CARD_ROTATIONS[index] ?? 0;

        return (
          <div
            key={item.num}
            className="relative"
            style={{
              zIndex: index + 1,
              // Short pin distance: enough to read, not a blank runway
              height: isLast ? "auto" : "48vh",
              marginBottom: isLast ? "0" : "-18vh",
            }}
          >
            <article
              className={`post-it !h-auto sticky top-28 md:top-32 w-full ${postIt?.tone ?? "post-it-yellow"}`}
              style={{
                transform: `rotate(${rotate}deg)`,
                boxShadow:
                  "2px 3px 0 rgba(10,10,10,0.04), 10px 22px 36px rgba(10,10,10,0.16)",
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
