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
        "app-background": "var(--background)"

      },
      screens: {
        xsm: "540px",
      },
    },
  },
  plugins: [],
}