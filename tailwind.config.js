/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        body: "#fcfcfc",
        text: "#262827",
        primary: "#5a2530",
        secondary: "#742435",
        dark: "#40262b",
        light: "#fcfcfc",
      },
      fontFamily: {
        jost: ['"Jost"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
