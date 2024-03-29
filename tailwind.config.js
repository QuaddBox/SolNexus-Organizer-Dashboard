/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#880ad0",
        "text-color": "#9e9e9e",
        "error-color": "#ff0909"
      },
    },
  },
  plugins: [],
};
