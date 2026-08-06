import type { Meta, StoryObj } from "@storybook/react-vite";
import { theme } from "../../tokens/theme";
import { MetricCard } from "./MetricCard";

const meta = {
  title: "Cashlog/Components/MetricCard",
  component: MetricCard,
  argTypes: {
    fill: {
      control: "select",
      options: ["lilac", "yellow"],
    },
    label: { control: "text" },
    value: { control: "text" },
    trend: { control: "text" },
  },
  args: {
    label: "Em aprovação",
    value: "820",
    trend: "+11.01%",
    fill: "lilac",
  },
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: 220 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Lilac: Story = {
  args: { fill: "lilac", label: "Em aprovação", value: "820", trend: "+11.01%" },
};

export const Yellow: Story = {
  args: { fill: "yellow", label: "Para concluir", value: "10", trend: "+3.2%" },
};

export const AllVariants: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 720 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div
      className="grid"
      style={{
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: theme.spacing[3],
      }}
    >
      <MetricCard label="Em aprovação" value="820" trend="+11.01%" fill="lilac" />
      <MetricCard label="Para concluir" value="10" trend="+3.2%" fill="yellow" />
      <MetricCard label="Em holding" value="34" trend="-1.4%" fill="lilac" />
      <MetricCard label="Aprovadas" value="1.204" trend="+8.6%" fill="yellow" />
    </div>
  ),
};

export const States: Story = {
  name: "Sem trend",
  args: {
    label: "Em holding",
    value: "34",
    trend: undefined,
    fill: "lilac",
    sparkline: [0.4, 0.42, 0.38, 0.41],
  },
};

export const Playground: Story = {
  args: {
    label: "Playground",
    value: "99",
    trend: "+1.0%",
    fill: "yellow",
  },
};
