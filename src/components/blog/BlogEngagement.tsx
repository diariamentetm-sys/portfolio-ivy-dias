type BlogEngagementProps = {
  views: number;
  likes: number;
  liked: boolean;
  onToggleLike: () => void;
  viewsLabel: string;
  likeLabel: string;
  likedLabel: string;
  compact?: boolean;
};

function EyeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.75" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function HeartIcon({
  filled,
  className = "",
}: {
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        d="M12 20.5s-7.2-4.35-9.05-8.2C1.55 9.35 2.9 6.5 5.7 5.85c1.7-.4 3.35.25 4.3 1.55.95-1.3 2.6-1.95 4.3-1.55 2.8.65 4.15 3.5 2.75 6.45C19.2 16.15 12 20.5 12 20.5Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BlogEngagement({
  views,
  likes,
  liked,
  onToggleLike,
  viewsLabel,
  likeLabel,
  likedLabel,
  compact = false,
}: BlogEngagementProps) {
  return (
    <div
      className={`flex flex-wrap items-center ${compact ? "gap-3" : "gap-4"}`}
    >
      <span
        className={`inline-flex items-center gap-1.5 text-neutral-500 ${
          compact ? "text-xs" : "text-sm"
        }`}
        title={viewsLabel}
      >
        <EyeIcon className="shrink-0" />
        <span className="font-semibold tabular-nums text-neutral-700">
          {views}
        </span>
        {!compact ? <span className="sr-only">{viewsLabel}</span> : null}
      </span>

      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onToggleLike();
        }}
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          liked
            ? "border-accent/40 bg-accent/10 text-accent"
            : "border-neutral-200 bg-white text-neutral-500 hover:border-accent/40 hover:text-accent"
        } ${compact ? "text-xs" : "text-sm"}`}
        aria-pressed={liked}
        aria-label={liked ? likedLabel : likeLabel}
      >
        <HeartIcon filled={liked} className="shrink-0" />
        <span className="font-semibold tabular-nums">{likes}</span>
      </button>
    </div>
  );
}
