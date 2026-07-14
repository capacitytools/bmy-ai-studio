/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        yt: {
          bg: '#0f0f0f', surface: '#272727', hover: '#3f3f3f',
          text: '#f1f1f1', textSec: '#aaaaaa', red: '#ff0000', border: '#303030',
        }
      }
    },
  },
  plugins: [],
}
