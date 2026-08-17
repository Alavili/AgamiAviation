import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-space-grotesk)", ...defaultTheme.fontFamily.sans],
      },
      // Sampled from figma_images/ (home hero, scrolled navbar, footer) — see styles/tokens.ts.
      colors: {
        brand: {
          orange: "#FA911C",
          "orange-dark": "#E0800F",
        },
        surface: {
          dark: "#141D20",
          black: "#000000",
        },
      },
      keyframes: {
        "navbar-in": {
          from: { transform: "translateY(-100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "navbar-in": "navbar-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
