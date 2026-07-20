import { useRef, useState } from "react";
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
}: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

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
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="eyebrow">{label}</span>

      {value ? (
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
      )}

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

      <label className="flex flex-col gap-2">
        <span className="eyebrow">{urlLabel}</span>
        <input
          className="input-field"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="https://…"
        />
      </label>
    </div>
  );
}
