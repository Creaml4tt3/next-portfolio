/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#e9e9e9",
        grey: "#1b1c1c",
        grey_08: "rgba(27,28,28,0.8)",
        white: "#ffffff",
        blue: "#5299f0",
        blue_08: "rgba(82,153,240,0.8)",
        pink: "#E97090",
        redder: "#AE395E",
      },
      fontFamily: {
        mono: ["Font", "sans-serif"],
        noto_sans_thai: ["Noto Sans Thai", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
