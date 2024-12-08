/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        appDanger: "#D77777",
      },
      screens: {
        xsm: "540px",
      },
      fontFamily: {
        appLight: ["interface-light"],
        appRegular: ["interface-regular"],
      },
    },
  },
  plugins: [],
}