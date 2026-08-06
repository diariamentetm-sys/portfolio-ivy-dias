import type { Meta, StoryObj } from "@storybook/react-vite";
import { theme } from "../../tokens/theme";
import { Button } from "../index";
import { Card, CardHeader } from "./Card";

const meta = {
  title: "Cashlog/Components/Card",
  component: Card,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "muted", "outlined"],
    },
    padding: {
      control: "select",
      options: [3, 4, 5, 6, 8],
    },
  },
  args: {
    variant: "default",
    padding: 6,
    children: "Conteúdo do card",
  },
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader title="Dispêndio X Plano Mensal" />
      <p
        style={{
          margin: 0,
          fontFamily: theme.fontFamily.sans,
          fontSize: theme.fontSize.sm,
          color: theme.colors.text.muted,
        }}
      >
        Painel flat — borda fina, sem sombra (layout do dashboard).
      </p>
    </Card>
  ),
};

export const Muted: Story = {
  args: { variant: "muted" },
  render: (args) => (
    <Card {...args}>
      <CardHeader title="Holding" />
      <p style={{ margin: 0, color: theme.colors.text.muted, fontSize: theme.fontSize.sm }}>
        Superfície overlay, sem elevação.
      </p>
    </Card>
  ),
};

export const Outlined: Story = {
  args: { variant: "outlined" },
  render: (args) => (
    <Card {...args}>
      <CardHeader title="Outlined" />
      <p style={{ margin: 0, color: theme.colors.text.muted, fontSize: theme.fontSize.sm }}>
        Borda strong, sem sombra.
      </p>
    </Card>
  ),
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
    <div className="grid" style={{ gridTemplateColumns: "1fr 1fr 1fr", gap: theme.spacing[4] }}>
      <Card variant="default" padding={4}>
        <CardHeader title="Default" />
        <p style={{ margin: 0, fontSize: theme.fontSize.sm, color: theme.colors.text.muted }}>
          flat · border.default
        </p>
      </Card>
      <Card variant="muted" padding={4}>
        <CardHeader title="Muted" />
        <p style={{ margin: 0, fontSize: theme.fontSize.sm, color: theme.colors.text.muted }}>
          surface.overlay
        </p>
      </Card>
      <Card variant="outlined" padding={4}>
        <CardHeader title="Outlined" />
        <p style={{ margin: 0, fontSize: theme.fontSize.sm, color: theme.colors.text.muted }}>
          border.strong
        </p>
      </Card>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <Card>
      <CardHeader
        title="Últimas demandas"
        action={<Button variant="secondary">Ver todas</Button>}
      />
      <p style={{ margin: 0, fontSize: theme.fontSize.sm, color: theme.colors.text.muted }}>
        Header com ação — padrão dos painéis laterais.
      </p>
    </Card>
  ),
};

export const Playground: Story = {
  args: { variant: "default", padding: 6 },
  render: (args) => (
    <Card {...args}>
      <CardHeader title="Playground" />
      <p style={{ margin: 0, color: theme.colors.text.muted, fontSize: theme.fontSize.sm }}>
        Ajuste variant e padding nos controles.
      </p>
    </Card>
  ),
};
