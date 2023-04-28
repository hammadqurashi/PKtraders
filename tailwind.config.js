/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primaryBackground: "#111111",
          secondaryBackground: "#000000",
          tertiaryBackground: "#111111",
          fourthBackground: "#d1d8e0",
          primaryText: "#FFFFFF",
          secondaryText: "#84817a",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
