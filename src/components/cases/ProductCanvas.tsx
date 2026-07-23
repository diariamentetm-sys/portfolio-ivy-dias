type CanvasBlock = {
  label: string;
  body: string;
};

type ProductCanvasProps = {
  title?: string;
  blocks: readonly CanvasBlock[];
};

export function ProductCanvas({ title, blocks }: ProductCanvasProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card">
      {title ? (
        <div className="border-b border-neutral-200 bg-neutral-50 px-5 py-4 md:px-6">
          <p className="eyebrow text-accent">{title}</p>
        </div>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {blocks.map((block, index) => (
          <div
            key={block.label}
            className={[
              "flex flex-col gap-2 p-5 md:p-6",
              index % 2 === 0 ? "bg-white" : "bg-neutral-50/70",
              "border-b border-neutral-200 sm:border-r",
              "sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0",
              "last:border-b-0",
            ].join(" ")}
          >
            <div className="flex items-start gap-2">
              <span
                className={[
                  "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm text-[10px] font-bold text-neutral-900",
                  index % 6 === 0
                    ? "bg-[#fef08a]"
                    : index % 6 === 1
                      ? "bg-[#bae6fd]"
                      : index % 6 === 2
                        ? "bg-[#fecaca]"
                        : index % 6 === 3
                          ? "bg-[#bbf7d0]"
                          : index % 6 === 4
                            ? "bg-[#ddd6fe]"
                            : "bg-[#fed7aa]",
                ].join(" ")}
                aria-hidden
              >
                {index + 1}
              </span>
              <p className="eyebrow text-neutral-700">{block.label}</p>
            </div>
            <p className="text-sm leading-relaxed text-neutral-800 text-pretty">
              {block.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
