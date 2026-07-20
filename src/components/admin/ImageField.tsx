import { FormEvent, useRef, useState } from "react";
import { uploadPortfolioImage } from "../../lib/uploadImage";

type ImageFieldProps = {
  label: string;
  value: string;
  folder: "hero" | "contact" | "projects";
  onChange: (url: string) => void;
  previewClassName?: string;
  uploadLabel: string;
  uploadingLabel: string;
  urlLabel: string;
  /** When true, URL is committed only via Add button / Enter (for galleries). */
  appendMode?: boolean;
  addUrlLabel?: string;
  hideEmptyPreview?: boolean;
};

export function ImageField({
  label,
  value,
  folder,
  onChange,
  previewClassName = "w-full max-w-sm rounded-2xl object-cover aspect-[4/5]",
  uploadLabel,
  uploadingLabel,
  urlLabel,
  appendMode = false,
  addUrlLabel = "Add URL",
  hideEmptyPreview = false,
}: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [draftUrl, setDraftUrl] = useState("");

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError("");
    const result = await uploadPortfolioImage(file, folder);
    setUploading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onChange(result.url);
    if (appendMode) setDraftUrl("");
  }

  function commitDraftUrl(event?: FormEvent) {
    event?.preventDefault();
    const next = draftUrl.trim();
    if (!next) return;
    onChange(next);
    setDraftUrl("");
  }

  const showPreview = Boolean(value) || !hideEmptyPreview;

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-semibold text-neutral-950">{label}</span>

      {showPreview ? (
        value ? (
          <img
            src={value}
            alt=""
            className={`${previewClassName} border border-neutral-200 bg-neutral-100`}
          />
        ) : (
          <div
            className={`${previewClassName} border border-dashed border-neutral-300 bg-neutral-100 flex items-center justify-center text-sm text-neutral-500`}
          >
            No image
          </div>
        )
      ) : null}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="btn-primary px-5 py-2.5 text-sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? uploadingLabel : uploadLabel}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            void handleFile(file);
            event.target.value = "";
          }}
        />
      </div>

      {error && <p className="text-sm text-error">{error}</p>}

      {appendMode ? (
        <form onSubmit={commitDraftUrl} className="flex flex-col gap-2">
          <span className="text-xs text-neutral-500">{urlLabel}</span>
          <div className="flex flex-wrap gap-2">
            <input
              className="input-field flex-1 min-w-[12rem]"
              value={draftUrl}
              onChange={(event) => setDraftUrl(event.target.value)}
              placeholder="https://…"
            />
            <button
              type="submit"
              className="btn-ghost px-4 py-2 text-sm"
              disabled={!draftUrl.trim()}
            >
              {addUrlLabel}
            </button>
          </div>
        </form>
      ) : (
        <label className="flex flex-col gap-2">
          <span className="text-xs text-neutral-500">{urlLabel}</span>
          <input
            className="input-field"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="https://…"
          />
        </label>
      )}
    </div>
  );
}
