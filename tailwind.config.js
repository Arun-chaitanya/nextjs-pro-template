/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0px 4px 15px rgba(0, 0, 0, 0.25)",
        "4xl": "2px 2px 64px 8px #00000029",
      },
    },
  },
  plugins: [],
};
