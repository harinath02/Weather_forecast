/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Raleway", "sans-serif"],
      },
      colors: {
        darkblue: "#1E213A",
        gray: {
          150: "#E7E7EB",
          250: "#A09FB1",
          350: "#88869D",
        },
      },
    },
  },
  plugins: [],
}

