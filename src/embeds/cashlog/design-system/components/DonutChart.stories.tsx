import type { Meta, StoryObj } from "@storybook/react-vite";
import { DonutChart } from "./DonutChart";

const SLICES = [
  { label: "Rio Grande do Sul", value: 38.6, tone: "segmentA" as const },
  { label: "Mato Grosso", value: 22.5, tone: "segmentB" as const },
  { label: "Amazonia", value: 30.8, tone: "segmentC" as const },
  { label: "Minas Gerais", value: 8.1, tone: "segmentD" as const },
];

const meta = {
  title: "Cashlog/Components/DonutChart",
  component: DonutChart,
  args: {
    title: "Estados mais demandados",
    slices: SLICES,
  },
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => <DonutChart slices={SLICES} />,
};

export const States: Story = {
  name: "Dois estados",
  args: {
    slices: [
      { label: "Sul", value: 62, tone: "segmentC" },
      { label: "Centro-Oeste", value: 38, tone: "segmentB" },
    ],
  },
};

export const Playground: Story = {};
