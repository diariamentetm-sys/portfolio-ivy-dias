import {
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type PropsWithChildren,
} from "react";
import { theme } from "../../tokens/theme";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: ButtonVariant;
}

type VariantStyle = {
  base: CSSProperties;
  hover: CSSProperties;
};

const variantStyles: Record<ButtonVariant, VariantStyle> = {
  primary: {
    base: {
      backgroundColor: theme.colors.brand.primary,
      color: theme.colors.text.inverse,
    },
    hover: {
      backgroundColor: theme.colors.brand.primaryHover,
    },
  },
  secondary: {
    base: {
      backgroundColor: theme.colors.brand.primarySubtle,
      color: theme.colors.text.brand,
    },
    hover: {
      backgroundColor: theme.colors.feedback.warningSubtle,
    },
  },
  ghost: {
    base: {
      backgroundColor: "transparent",
      color: theme.colors.text.brand,
    },
    hover: {
      backgroundColor: theme.colors.brand.primarySubtle,
    },
  },
};

/**
 * @description Dispara uma ação com variantes de ênfase visual.
 * @variant primary | secondary | ghost
 * @uses —
 * @usedBy App
 * @tokens theme.colors.brand.primary, primaryHover, primarySubtle | theme.colors.text.inverse, brand | theme.colors.feedback.warningSubtle | theme.colors.border.focus | theme.spacing.2,3,4 | theme.radius.md | theme.fontSize.sm
 * @snowflake
 */
export function Button({
  variant = "primary",
  className = "",
  children,
  style,
  disabled,
  type = "button",
  onMouseEnter,
  onMouseLeave,
  ...props
}: ButtonProps) {
  const [hovered, setHovered] = useState(false);
  const styles = variantStyles[variant];

  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center font-medium transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      ].join(" ")}
      style={{
        gap: theme.spacing[2],
        borderRadius: theme.radius.md,
        paddingLeft: theme.spacing[4],
        paddingRight: theme.spacing[4],
        paddingTop: theme.spacing[3],
        paddingBottom: theme.spacing[3],
        fontSize: theme.fontSize.sm,
        outlineColor: theme.colors.border.focus,
        ...styles.base,
        ...(hovered && !disabled ? styles.hover : null),
        ...style,
      }}
      onMouseEnter={(event) => {
        setHovered(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setHovered(false);
        onMouseLeave?.(event);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
