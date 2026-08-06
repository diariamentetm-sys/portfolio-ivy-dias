import type { Meta, StoryObj } from "@storybook/react-vite";
import { LineChart } from "./LineChart";

/** Coordenadas alinhadas ao dashboard / MobileDashboard. */
const DISP_POINTS = [
  { label: "Jan", valueLabel: "8.420,110", x: 0.02, y: 0.79, planY: 0.71 },
  { label: "Fev", valueLabel: "12.180,450", x: 0.2, y: 0.69, planY: 0.61 },
  { label: "Mar", valueLabel: "30.256,598", x: 0.4, y: 0.08, planY: 0.46 },
  { label: "Abr", valueLabel: "16.890,320", x: 0.58, y: 0.54, planY: 0.51 },
  { label: "Mai", valueLabel: "21.450,780", x: 0.76, y: 0.37, planY: 0.34 },
  { label: "Jun", valueLabel: "24.120,900", x: 0.98, y: 0.27, planY: 0.23 },
];

const meta = {
  title: "Cashlog/Components/LineChart",
  component: LineChart,
  args: {
    title: "Dispêndio X Plano Mensal",
    points: DISP_POINTS,
    defaultIndex: 2,
  },
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: 560 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <LineChart title="Dispêndio X Plano Mensal" points={DISP_POINTS} defaultIndex={2} />
  ),
};

export const States: Story = {
  name: "Ponto em Jun",
  args: { defaultIndex: 5 },
};

export const Playground: Story = {};
