import type { CSSProperties } from "react";
import { theme } from "../../tokens/theme";

export interface SwatchProps {
  name: string;
  /** Caminho semântico, ex.: theme.colors.brand.primary */
  tokenPath: string;
  /** Valor resolvido de theme (CSS var ou cor) — nunca hex inventado no call site */
  color: string;
}

/**
 * @description Exibe uma amostra de cor com nome e caminho do token.
 * @variant —
 * @uses —
 * @usedBy App
 * @tokens theme.colors.border.default | theme.colors.surface.default | theme.colors.text.default, muted | theme.spacing.1,3 | theme.radius.xl | theme.fontSize.sm, xs
 * @snowflake
 */
export function Swatch({ name, tokenPath, color }: SwatchProps) {
  const panelStyle: CSSProperties = {
    borderColor: theme.colors.border.default,
    backgroundColor: theme.colors.surface.default,
    borderRadius: theme.radius.xl,
  };

  return (
    <div className="overflow-hidden border" style={panelStyle}>
      <div
        style={{ backgroundColor: color, height: 80 }}
        aria-hidden
      />
      <div
        className="flex flex-col"
        style={{
          gap: theme.spacing[1],
          padding: theme.spacing[3],
        }}
      >
        <p
          className="font-medium"
          style={{
            color: theme.colors.text.default,
            fontSize: theme.fontSize.sm,
          }}
        >
          {name}
        </p>
        <p
          className="font-mono"
          style={{
            color: theme.colors.text.muted,
            fontSize: theme.fontSize.xs,
          }}
        >
          {tokenPath}
        </p>
        <p
          className="font-mono break-all"
          style={{
            color: theme.colors.text.muted,
            fontSize: theme.fontSize.xs,
          }}
        >
          {color}
        </p>
      </div>
    </div>
  );
}
