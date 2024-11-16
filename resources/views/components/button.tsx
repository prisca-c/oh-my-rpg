import React from 'react'

import { BG_COLORS, BgColors } from '#resources/enums/theme'

type ButtonProps = {
  children: React.ReactNode
  type?: 'button' | 'reset' | 'submit'
  onClick?: () => void
  color?: BgColors
}

export const Button = ({
  children,
  type = 'button',
  onClick = () => {},
  color = 'primary',
}: ButtonProps): React.ReactElement => {
  const bgColors = BG_COLORS[color]
  const classList = ['px-4', 'py-2', bgColors, 'text-white', 'rounded-md']
  const classString = classList.join(' ')

  return (
    <button type={type} onClick={onClick} className={classString}>
      {children}
    </button>
  )
}
