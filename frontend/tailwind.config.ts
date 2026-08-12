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
    },
  },
  plugins: [],
};

export default config;
