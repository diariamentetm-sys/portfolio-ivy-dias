import type { Meta, StoryObj } from "@storybook/react-vite";
import { Swatch } from "../index";
import { theme } from "../../tokens/theme";

const meta = {
  title: "Cashlog/Components/Swatch",
  component: Swatch,
  argTypes: {
    name: { control: "text" },
    tokenPath: { control: "text" },
    color: { control: "text" },
  },
  args: {
    name: "Primary",
    tokenPath: "theme.colors.brand.primary",
    color: theme.colors.brand.primary,
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 180 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Swatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const BrandPrimary: Story = {
  args: {
    name: "Primary",
    tokenPath: "theme.colors.brand.primary",
    color: theme.colors.brand.primary,
  },
};

export const TextMuted: Story = {
  args: {
    name: "Text Muted",
    tokenPath: "theme.colors.text.muted",
    color: theme.colors.text.muted,
  },
};

export const BorderDefault: Story = {
  args: {
    name: "Border",
    tokenPath: "theme.colors.border.default",
    color: theme.colors.border.default,
  },
};

export const AllVariants: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: 720 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div
      className="grid"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: theme.spacing[3],
      }}
    >
      <Swatch
        name="Primary"
        tokenPath="theme.colors.brand.primary"
        color={theme.colors.brand.primary}
      />
      <Swatch
        name="Primary Subtle"
        tokenPath="theme.colors.brand.primarySubtle"
        color={theme.colors.brand.primarySubtle}
      />
      <Swatch
        name="Link"
        tokenPath="theme.colors.text.link"
        color={theme.colors.text.link}
      />
      <Swatch
        name="Text Default"
        tokenPath="theme.colors.text.default"
        color={theme.colors.text.default}
      />
      <Swatch
        name="Border"
        tokenPath="theme.colors.border.default"
        color={theme.colors.border.default}
      />
      <Swatch
        name="Error"
        tokenPath="theme.colors.feedback.error"
        color={theme.colors.feedback.error}
      />
    </div>
  ),
};

export const States: Story = {
  name: "States",
  render: () => (
    <div className="flex flex-col" style={{ gap: theme.spacing[3], width: 180 }}>
      <Swatch
        name="Surface"
        tokenPath="theme.colors.surface.default"
        color={theme.colors.surface.default}
      />
      <Swatch
        name="Overlay"
        tokenPath="theme.colors.surface.overlay"
        color={theme.colors.surface.overlay}
      />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    name: "Playground",
    tokenPath: "theme.colors.brand.primary",
    color: theme.colors.brand.primary,
  },
};
