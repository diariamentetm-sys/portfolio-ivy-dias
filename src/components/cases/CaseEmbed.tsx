import { useEffect, useRef, useState } from "react";

type CaseEmbedProps = {
  src: string;
  title: string;
  designWidth: number;
  designHeight: number;
};

type Layout =
  | { mode: "fluid"; frameHeight: number }
  | { mode: "scaled"; scale: number; frameHeight: number };

function supportsCssZoom(): boolean {
  if (typeof CSS === "undefined" || typeof CSS.supports !== "function") {
    return false;
  }
  return CSS.supports("zoom", "1");
}

/**
 * Mobile: fluid iframe so the embed can reflow at real viewport width.
 * Desktop: design-size iframe scaled to container width.
 */
export function CaseEmbed({
  src,
  title,
  designWidth,
  designHeight,
}: CaseEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<Layout>({
    mode: "scaled",
    scale: 1,
    frameHeight: designHeight,
  });
  const [useZoom] = useState(supportsCssZoom);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");

    function recalc() {
      const node = containerRef.current;
      if (!node) return;
      const width = node.clientWidth;
      if (width <= 0) return;

      if (media.matches) {
        setLayout({
          mode: "fluid",
          frameHeight: Math.min(Math.max(window.innerHeight * 0.75, 580), 820),
        });
        return;
      }

      const scale = Math.min(1, width / designWidth);
      setLayout({
        mode: "scaled",
        scale,
        frameHeight: designHeight * scale,
      });
    }

    recalc();
    const ro = new ResizeObserver(recalc);
    if (containerRef.current) ro.observe(containerRef.current);
    media.addEventListener("change", recalc);
    window.addEventListener("resize", recalc);
    return () => {
      ro.disconnect();
      media.removeEventListener("change", recalc);
      window.removeEventListener("resize", recalc);
    };
  }, [designWidth, designHeight]);

  if (layout.mode === "fluid") {
    return (
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card"
        style={{ height: layout.frameHeight }}
      >
        <iframe
          key={`${src}-fluid`}
          src={src}
          title={title}
          className="absolute inset-0 block h-full w-full border-0"
          allow="fullscreen"
          referrerPolicy="no-referrer-when-downgrade"
          {...({ loading: "eager" } as const)}
        />
      </div>
    );
  }

  const { scale, frameHeight } = layout;
  const scaledWidth = designWidth * scale;

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-card"
        style={{ height: frameHeight }}
      >
        <div style={{ width: scaledWidth, height: frameHeight }}>
          <div
            className="origin-top-left bg-white"
            style={
              useZoom
                ? { width: designWidth, height: designHeight, zoom: scale }
                : {
                    width: designWidth,
                    height: designHeight,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                  }
            }
          >
            <iframe
              key={`${src}-scaled`}
              src={src}
              title={title}
              width={designWidth}
              height={designHeight}
              className="block border-0"
              style={{
                width: designWidth,
                height: designHeight,
                pointerEvents: "auto",
              }}
              allow="fullscreen"
              referrerPolicy="no-referrer-when-downgrade"
              {...({ loading: "eager" } as const)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
