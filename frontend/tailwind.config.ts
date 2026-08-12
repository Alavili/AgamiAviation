import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // Pixel-measured against Figma once section screenshots start coming in (PROJECT_PLAN.md §4).
      colors: {},
    },
  },
  plugins: [],
};

export default config;
