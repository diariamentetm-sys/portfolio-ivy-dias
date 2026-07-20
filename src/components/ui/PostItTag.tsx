const tones = [
  "post-it-yellow",
  "post-it-blue",
  "post-it-coral",
  "post-it-mint",
  "post-it-lavender",
  "post-it-peach",
] as const;

const rotates = ["-rotate-1", "rotate-1", "-rotate-1", "rotate-1"] as const;

type PostItTagProps = {
  children: string;
  index?: number;
  tone?: (typeof tones)[number];
  className?: string;
};

export function postItTone(index: number) {
  return tones[index % tones.length];
}

export function postItRotate(index: number) {
  return rotates[index % rotates.length];
}

export function PostItTag({
  children,
  index = 0,
  tone,
  className = "",
}: PostItTagProps) {
  return (
    <span
      className={`post-it post-it-tag ${tone ?? postItTone(index)} ${postItRotate(index)} ${className}`}
    >
      {children}
    </span>
  );
}
