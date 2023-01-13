/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        home: "url('/img/home-bg.png')",
      },
    },
    colors: {
      white: "#f5f3ed",
      blue: {
        100: "#92bfc4",
        200: "#5dd6de",
        300: "#41989b",
      },
      pink: {
        100: "#c7a8aa",
        200: "#fd9191",
      },
      gray: {
        300: "#B1B4BD",
        400: "#91949D",
        500: "#696C74",
      },
      black: "#0B0E16",
    },
    fontFamily: {
      serif: ["Old Standard TT", "serif"],
      sans: ["Sofia Sans", "san-serif"],
    },
  },
  plugins: [],
};
