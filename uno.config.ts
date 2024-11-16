import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  content: {},
  safelist: [
    'bg-primary',
    'bg-secondary',
    'bg-light-primary',
    'bg-dark-primary',
    'bg-light-secondary',
    'bg-dark-secondary',
    'bg-gray',
    'bg-dark-gray',
    'bg-light-gray',
  ],
  presets: [presetAttributify(), presetUno(), presetTypography(), presetWebFonts()],
  theme: {
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
    fontFamily: {
      creato: ['CreatoDisplay', 'sans-serif'],
      gamer: ['Gamer', 'sans-serif'],
    },
    extends: {
      backgroundImage: {
        inventory: "url('/images/inventory.jpeg')",
      },
    },
  },
})
