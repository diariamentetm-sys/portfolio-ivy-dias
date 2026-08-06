import type { Preview } from "@storybook/react-vite";
import { theme } from "../src/embeds/cashlog/tokens/theme";
import "../src/embeds/cashlog/styles/tokens.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    backgrounds: {
      default: "cashlog-surface",
      values: [
        { name: "cashlog-surface", value: theme.colors.surface.overlay },
        { name: "cashlog-canvas", value: theme.colors.surface.default },
      ],
    },
    docs: {
      toc: true,
    },
  },
};

export default preview;
