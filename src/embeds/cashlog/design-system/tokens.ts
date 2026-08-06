import { theme } from "../tokens/theme";

/** Catálogo semântico para o workshop — valores só via theme (zero hex). */
export const tokenGallery = {
  brand: [
    {
      name: "Primary",
      tokenPath: "theme.colors.brand.primary",
      color: theme.colors.brand.primary,
    },
    {
      name: "Primary Hover",
      tokenPath: "theme.colors.brand.primaryHover",
      color: theme.colors.brand.primaryHover,
    },
    {
      name: "Primary Subtle",
      tokenPath: "theme.colors.brand.primarySubtle",
      color: theme.colors.brand.primarySubtle,
    },
    {
      name: "Link / Accent",
      tokenPath: "theme.colors.text.link",
      color: theme.colors.text.link,
    },
    {
      name: "Warning",
      tokenPath: "theme.colors.feedback.warning",
      color: theme.colors.feedback.warning,
    },
    {
      name: "Warning Subtle",
      tokenPath: "theme.colors.feedback.warningSubtle",
      color: theme.colors.feedback.warningSubtle,
    },
  ],
  neutrals: [
    {
      name: "Text Default",
      tokenPath: "theme.colors.text.default",
      color: theme.colors.text.default,
    },
    {
      name: "Text Muted",
      tokenPath: "theme.colors.text.muted",
      color: theme.colors.text.muted,
    },
    {
      name: "Border",
      tokenPath: "theme.colors.border.default",
      color: theme.colors.border.default,
    },
    {
      name: "Surface Overlay",
      tokenPath: "theme.colors.surface.overlay",
      color: theme.colors.surface.overlay,
    },
    {
      name: "Surface Default",
      tokenPath: "theme.colors.surface.default",
      color: theme.colors.surface.default,
    },
  ],
} as const;

export const plannedScreens = [
  { id: "dashboard", label: "Dashboard", status: "legacy" as const },
  { id: "priorizador", label: "Priorizador", status: "legacy" as const },
  { id: "demanda", label: "Criação de demanda", status: "legacy" as const },
  { id: "holding", label: "Holding", status: "legacy" as const },
] as const;
