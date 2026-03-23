/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        squash: {
          orange: '#F97316',
          light: '#FFF7ED',
        }
      }
    },
  },
  plugins: [],
}
