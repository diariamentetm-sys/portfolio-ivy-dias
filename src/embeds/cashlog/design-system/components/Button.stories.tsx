import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../index";
import { theme } from "../../tokens/theme";

const meta = {
  title: "Cashlog/Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
    },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Button",
    variant: "primary",
    disabled: false,
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
  args: { variant: "primary", children: "Primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Ghost" },
};

export const AllVariants: Story = {
  render: () => (
    <div
      className="flex flex-wrap"
      style={{ gap: theme.spacing[3] }}
    >
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div
      className="flex flex-col"
      style={{ gap: theme.spacing[4] }}
    >
      <div className="flex flex-wrap" style={{ gap: theme.spacing[3] }}>
        <Button>Enabled</Button>
        <Button disabled>Disabled</Button>
      </div>
      <div className="flex flex-wrap" style={{ gap: theme.spacing[3] }}>
        <Button variant="secondary">Enabled</Button>
        <Button variant="secondary" disabled>
          Disabled
        </Button>
      </div>
      <div className="flex flex-wrap" style={{ gap: theme.spacing[3] }}>
        <Button variant="ghost">Enabled</Button>
        <Button variant="ghost" disabled>
          Disabled
        </Button>
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    variant: "primary",
    children: "Playground",
    disabled: false,
  },
};
