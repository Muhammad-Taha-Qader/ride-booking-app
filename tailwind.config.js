/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      colors: {
        // primary: '#F7CB00',
        primary: '#a855f7',
        secondary: '#FFFFFF',
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        'feminine': '0 4px 6px -1px rgba(247, 203, 0, 0.1), 0 2px 4px -1px rgba(247, 203, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
