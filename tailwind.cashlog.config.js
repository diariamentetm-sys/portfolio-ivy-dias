/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/embeds/cashlog/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cashlog: {
          purple: "var(--cashlog-purple)",
          "purple-mid": "var(--cashlog-purple-mid)",
          "pink-light": "var(--cashlog-pink-light)",
          magenta: "var(--cashlog-magenta)",
          yellow: "var(--cashlog-yellow)",
          "yellow-pale": "var(--cashlog-yellow-pale)",
          "yellow-gold": "var(--cashlog-yellow-gold)",
          ink: "var(--cashlog-ink)",
          muted: "var(--cashlog-muted)",
          border: "var(--cashlog-border)",
          surface: "var(--cashlog-surface)",
          canvas: "var(--cashlog-canvas)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
