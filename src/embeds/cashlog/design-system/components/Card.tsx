import type { CSSProperties, HTMLAttributes, PropsWithChildren, ReactNode } from "react";
import { theme } from "../../tokens/theme";

export type CardVariant = "default" | "muted" | "outlined";

export interface CardProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  variant?: CardVariant;
  padding?: keyof typeof theme.spacing;
}

/**
 * Painéis do dashboard Cashlog são flat: superfície + borda fina, zero sombra.
 */
const variantStyles: Record<CardVariant, CSSProperties> = {
  default: {
    backgroundColor: theme.colors.surface.default,
    borderColor: theme.colors.border.default,
    boxShadow: theme.shadow.none,
  },
  muted: {
    backgroundColor: theme.colors.surface.overlay,
    borderColor: theme.colors.border.subtle,
    boxShadow: theme.shadow.none,
  },
  outlined: {
    backgroundColor: theme.colors.surface.default,
    borderColor: theme.colors.border.strong,
    boxShadow: theme.shadow.none,
  },
};

/**
 * @description Contêiner flat do dashboard (borda, sem elevação).
 * @variant default | muted | outlined
 * @uses —
 * @usedBy MetricCard | BarChart | LineChart | DonutChart
 * @tokens theme.colors.surface.* | theme.colors.border.* | theme.shadow.none | theme.radius.md | theme.spacing.*
 * @snowflake
 */
export function Card({
  variant = "default",
  padding = 6,
  className = "",
  style,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={["border overflow-hidden", className].filter(Boolean).join(" ")}
      style={{
        borderRadius: theme.radius.md,
        padding: theme.spacing[padding],
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}

/**
 * @description Cabeçalho tipográfico padrão de um Card.
 * @variant —
 * @uses —
 * @usedBy BarChart | LineChart | DonutChart | Card stories
 * @tokens theme.colors.text.muted, default | theme.fontSize.xs, sm | theme.spacing.1,3 | theme.fontFamily.sans
 * @snowflake
 */
export function CardHeader({ eyebrow, title, action }: CardHeaderProps) {
  return (
    <div
      className="flex items-start justify-between"
      style={{ gap: theme.spacing[3], marginBottom: theme.spacing[3] }}
    >
      <div>
        {eyebrow ? (
          <p
            style={{
              margin: 0,
              marginBottom: theme.spacing[1],
              fontFamily: theme.fontFamily.sans,
              fontSize: theme.fontSize.xs,
              fontWeight: 400,
              color: theme.colors.text.muted,
            }}
          >
            {eyebrow}
          </p>
        ) : null}
        <h3
          style={{
            margin: 0,
            fontFamily: theme.fontFamily.sans,
            fontSize: theme.fontSize.sm,
            fontWeight: 600,
            color: theme.colors.text.default,
          }}
        >
          {title}
        </h3>
      </div>
      {action}
    </div>
  );
}
