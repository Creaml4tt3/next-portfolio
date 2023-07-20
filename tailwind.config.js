/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      laptop: { max: "1440px" },
      tablet: { max: "1023px" },
      mobile: { max: "767px" },
    },
    extend: {
      colors: {
        bg: "#e9e9e9",
        softGrey: "#262626",
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
      padding: {
        desktop: "60px",
        laptop: "40px",
        tablet: "30px",
        mobile: "20px",
      },
      boxShadow: {
        solid: "0 8px 0px black",
        medium_solid: "0 4px 0px black",
        small_solid: "0 2px 0px black",
      },
      translate: {
        solid: "8px",
        medium_solid: "4px",
        small_solid: "2px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
