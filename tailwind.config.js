/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'poppins-regular': ['PRegular', 'sans-serif'],
        'poppins-bold': ['PBold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
