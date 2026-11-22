type ScrollIndicatorProps = {
  label: string;
  targetId?: string;
};

/**
 * @description Discrete scroll cue for the v2 hero.
 */
export function ScrollIndicator({
  label,
  targetId = "work",
}: ScrollIndicatorProps) {
  return (
    <a
      href={`#${targetId}`}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        fontSize: 12,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        opacity: 0.7,
        minHeight: 44,
        justifyContent: "center",
      }}
    >
      <span>{label}</span>
      <span aria-hidden="true" style={{ width: 1, height: 28, background: "currentColor" }} />
    </a>
  );
}
