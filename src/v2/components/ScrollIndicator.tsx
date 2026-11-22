type ScrollIndicatorProps = {
  label: string;
  targetId?: string;
};

/**
 * @description Discrete scroll cue for the v2 hero — soft pulse when motion allowed.
 */
export function ScrollIndicator({
  label,
  targetId = "work",
}: ScrollIndicatorProps) {
  return (
    <a
      href={`#${targetId}`}
      className="v2-scroll-cue"
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
      <span
        aria-hidden="true"
        className="v2-scroll-cue__line"
        style={{ width: 1, height: 28, background: "currentColor" }}
      />
    </a>
  );
}
