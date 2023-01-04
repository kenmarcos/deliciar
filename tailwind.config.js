/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      white: "#f5f3ed",
      blue: {
        100: "#92bfc4",
        200: "#5dd6de",
      },
      pink: {
        100: "#c7a8aa",
        200: "#fd9191",
      },
    },
  },
  plugins: [],
};
