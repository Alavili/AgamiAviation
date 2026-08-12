// Design tokens pixel-sampled from the Figma screenshots in figma_images/
// (home hero, scrolled navbar, footer). Mirrored into tailwind.config.ts
// theme.extend.colors — update both together if these change.

export const tokens = {
  colors: {
    brand: {
      orange: "#FA911C",
      orangeDark: "#E0800F",
    },
    surface: {
      dark: "#141D20", // scrolled navbar / mobile menu background
      black: "#000000", // footer background
    },
  },
};
