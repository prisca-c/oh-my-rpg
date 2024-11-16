export const BG_COLORS = {
  gray: 'bg-gray',
  white: 'bg-white',
  primary: 'bg-primary',
  darkGray: 'bg-dark-gray',
  secondary: 'bg-secondary',
  lightGray: 'bg-light-gray',
  darkPrimary: 'bg-dark-primary',
  lightPrimary: 'bg-light-primary',
  darkSecondary: 'bg-dark-secondary',
  lightSecondary: 'bg-light-secondary',
} as const

export type BgColors = keyof typeof BG_COLORS
