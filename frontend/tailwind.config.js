/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#EAF2FF',
        'custom-green': '#96F0D0',
        'custom-light-green': '#D6FFF4'
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* For WebKit browsers */
          '-ms-overflow-style': 'none', /* for Internet Explorer, Edge */
          'scrollbar-width': 'none', /* for Firefox */
          '&::-webkit-scrollbar': {
            display: 'none', /* for Chrome, Safari, and Opera */
          },
        },
      });
    },
  ],
}
