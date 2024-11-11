/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#022424',
        accent: '#00ff3f',
        text: '#03ffc3',
      },
    },
  },
  plugins: [],
};