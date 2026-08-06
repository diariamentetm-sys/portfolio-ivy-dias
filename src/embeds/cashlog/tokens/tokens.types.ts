import type { theme } from "./theme";

export type BackgroundToken = keyof typeof theme.colors.background;
export type TextToken = keyof typeof theme.colors.text;
export type BrandToken = keyof typeof theme.colors.brand;
export type FeedbackToken = keyof typeof theme.colors.feedback;
export type BorderToken = keyof typeof theme.colors.border;
export type SurfaceToken = keyof typeof theme.colors.surface;
export type SpacingToken = keyof typeof theme.spacing;
export type FontSizeToken = keyof typeof theme.fontSize;
export type RadiusToken = keyof typeof theme.radius;
export type ShadowToken = keyof typeof theme.shadow;
