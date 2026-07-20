import type { ReactNode } from "react";

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

type PostItNoteProps = {
  children: ReactNode;
  index?: number;
  tone?: (typeof tones)[number];
  compact?: boolean;
  stat?: boolean;
  className?: string;
};

export function PostItNote({
  children,
  index = 0,
  tone,
  compact = false,
  stat = false,
  className = "",
}: PostItNoteProps) {
  const sizeClass = stat ? "post-it-stat" : compact ? "post-it-compact" : "";

  return (
    <div
      className={`post-it ${sizeClass} ${tone ?? postItTone(index)} ${postItRotate(index)} ${className}`}
    >
      {children}
    </div>
  );
}
