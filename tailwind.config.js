/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "app-primary": "var(--primary-text)",
        "app-secondary": "var(--secondary-text)",

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