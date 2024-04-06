import React from 'react'

import { BgColors } from '#resources/enums/tailwind'

type ButtonProps = {
  children: React.ReactNode
  type?: 'button' | 'reset' | 'submit'
  onClick?: () => void
  color?: keyof typeof BgColors
}

export const Button = ({
  children,
  type = 'button',
  onClick = () => {},
  color = 'primary',
}: ButtonProps): React.ReactElement => {
  const bgColors = BgColors[color]
  const classList = ['px-4', 'py-2', bgColors, 'text-white', 'rounded-md']
  const classString = classList.join(' ')

  return (
    <button type={type} onClick={onClick} className={classString}>
      {children}
    </button>
  )
}
