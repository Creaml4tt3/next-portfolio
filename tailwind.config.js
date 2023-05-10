/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#e9e9e9",
        grey: "#1b1c1c",
        grey_08: "rgba(27,28,28,0.8)",
        white: "#ffffff",
        blue: "#5299f0",
      },
      fontFamily: {
        mono: ["Font", "sans-serif"],
        noto_sans_thai: ["Noto Sans Thai", "sans-serif"],
      },
    },
  },
  plugins: [],
};
