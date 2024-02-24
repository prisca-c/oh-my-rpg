/** @type {import('tailwindcss').Config} */
export default {
  content: ['./resources/**/*.{edge,js,ts,jsx,tsx,vue}'],
  prefix: '',
  theme: {
    fontFamily: {
      creato: ['CreatoDisplay', 'sans-serif'],
      gamer: ['Gamer', 'sans-serif'],
    },
    container: {},
    extend: {
      colors: {
        'primary': '#ff984f',
        'secondary': '#ffe24f',
        'light-primary': '#ffb580',
        'dark-primary': '#FF6A00',
        'light-secondary': '#ffe77f',
        'dark-secondary': '#FFD700',
        'gray': '#e7e7e7',
        'dark-gray': '#797979',
        'light-gray': '#bdbdbd',
      },
    },
  },
  plugins: [],
}
