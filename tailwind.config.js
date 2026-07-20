/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: {
          50: "#FAFAF8",
          200: "#E4E4E1",
          500: "#6B6B6B",
          800: "#2E2E2E",
          950: "#0A0A0A",
        },
        accent: {
          DEFAULT: "#3B6FEA",
          blue: "#3B6FEA",
        },
        success: "#1FA463",
        warning: "#E39A3B",
        error: "#DC4C4C",
      },
      fontFamily: {
        sans: ["Hanken Grotesk", "system-ui", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      fontSize: {
        display: ["clamp(3.5rem,8vw,6rem)", { lineHeight: "0.98", letterSpacing: "-0.03em", fontWeight: "800" }],
        "section-title": ["clamp(2rem,4vw,2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        "card-title": ["1.125rem", { lineHeight: "1.35", fontWeight: "600" }],
      },
      boxShadow: {
        card: "0 4px 24px rgba(10, 10, 10, 0.06)",
        "card-hover": "0 8px 32px rgba(10, 10, 10, 0.08)",
      },
      borderRadius: {
        card: "1.25rem",
        ui: "0.5rem",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
    },
  },
  plugins: [],
};
