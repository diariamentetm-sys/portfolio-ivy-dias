import type { Meta, StoryObj } from "@storybook/react-vite";
import { BarChart } from "./BarChart";

const DASHBOARD_POINTS = [
  { label: "Jan", real: 55, approved: 40, realLabel: "18.2M", approvedLabel: "14.1M" },
  { label: "Fev", real: 70, approved: 50, realLabel: "22.4M", approvedLabel: "16.8M" },
  { label: "Mar", real: 45, approved: 35, realLabel: "15.6M", approvedLabel: "12.0M" },
  { label: "Abr", real: 88, approved: 65, realLabel: "26.8M", approvedLabel: "20.4M" },
  { label: "Mai", real: 78, approved: 58, realLabel: "24.1M", approvedLabel: "18.6M" },
  { label: "Jun", real: 95, approved: 72, realLabel: "28.5M", approvedLabel: "22.0M" },
];

const meta = {
  title: "Cashlog/Components/BarChart",
  component: BarChart,
  args: {
    title: "Real X Total Aprovado",
    points: DASHBOARD_POINTS,
  },
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 440 }}>
        <Story />
      </div>
    ),
  ],
  render: () => <BarChart title="Real X Total Aprovado" points={DASHBOARD_POINTS} />,
};

export const States: Story = {
  name: "Trimestre",
  args: {
    title: "Real X Total Aprovado",
    points: DASHBOARD_POINTS.slice(0, 3),
  },
};

export const Playground: Story = {};
