type CaseEmbedProps = {
  src: string;
  title: string;
  heightClassName?: string;
};

/** Full-width navigable embed for interactive prototypes. */
export function CaseEmbed({
  src,
  title,
  heightClassName = "h-[70vh] min-h-[520px] md:min-h-[640px]",
}: CaseEmbedProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card ${heightClassName}`}
    >
      <iframe
        key={src}
        src={src}
        title={title}
        className="absolute inset-0 block h-full w-full border-0"
        style={{ pointerEvents: "auto" }}
        allow="fullscreen"
        referrerPolicy="no-referrer-when-downgrade"
        // Avoid stale prototype shells while iterating on embeds.
        {...({ loading: "eager" } as const)}
      />
    </div>
  );
}
