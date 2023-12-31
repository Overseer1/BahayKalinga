/** @type {import('tailwindcss').Config} */
const { violet, blackA, mauve, green, red } = require("@radix-ui/colors");
const colors = require("tailwindcss/colors");
console.log();
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      ...colors,
      main: "#C4C1AA",
      ...mauve,
      ...violet,
      ...green,
      ...blackA,
      ...red,
    },
    keyframes: {
      overlayShow: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      contentShow: {
        from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
        to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
      },
    },
    animation: {
      overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
    },
    extend: {},
  },
  plugins: [],
};
