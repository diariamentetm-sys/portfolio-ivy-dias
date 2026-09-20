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
    <span
      className={`inline-flex h-5 w-5 shrink-0 items-center justify-center ${className}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={filled ? "currentColor" : "none"}
        aria-hidden
      >
        <path
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          stroke={filled ? "none" : "currentColor"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
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
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          liked
            ? "border-accent/40 bg-accent/10 text-accent"
            : "border-neutral-200 bg-white text-neutral-500 hover:border-accent/40 hover:text-accent"
        } ${compact ? "text-xs" : "text-sm"}`}
        aria-pressed={liked}
        aria-label={liked ? likedLabel : likeLabel}
      >
        <HeartIcon filled={liked} />
        <span className="font-semibold tabular-nums leading-none">{likes}</span>
      </button>
    </div>
  );
}
