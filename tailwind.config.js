/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'neon-orange': '#FFA500',
      },
      textShadow: {
        DEFAULT: '0 0 10px rgba(255, 165, 0, 0.75)',
      },
      fontFamily: {
        poppins: ['Poppins'],
        'poppins-bold': ['Poppins_Bold'],
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        '.text-shadow': {
          textShadowColor: theme('textShadow.DEFAULT'),
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 10,
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
