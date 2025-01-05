/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors : {
        primary : {
          DEFAULT: '#16a34a' // '#029e12'//'#16a34a' //'#047857' //'#a855f7' //'#064E3B' //'#022C22' //'#22C55E' //'#6366f1'  //#16A34A
        }
      }
    },
  },
  plugins: [],
}