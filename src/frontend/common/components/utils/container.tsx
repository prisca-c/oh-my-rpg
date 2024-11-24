import React from 'react'
import type { HTMLAttributesProps } from '~/common/types/html_attributes'
import { BG_COLORS, BgColors } from '~/common/enums/theme'

type Props = HTMLAttributesProps & {
  children: React.ReactNode
  direction?: 'row' | 'col'
  justify?: 'center' | 'start' | 'end' | 'between' | 'around' | 'evenly'
  align?: 'center' | 'start' | 'end' | 'stretch' | 'baseline'
  className?: string
  gap?: number
  containerType?: 'div' | 'section' | 'main' | 'header' | 'footer'
  bg?: BgColors
  rounded?: boolean
}

export const Container = (props: Props) => {
  const {
    children,
    direction = 'col',
    justify = 'center',
    align = 'center',
    className = '',
    gap = 0,
    containerType = 'div',
    rounded = false,
    bg,
    ...argRest
  } = props

  const gapStyle = gap ? `gap-${gap}` : ''
  const directionStyle = `flex-${direction}`
  const justifyStyle = `justify-${justify}`
  const alignStyle = `items-${align}`
  const roundedClass = rounded ? 'rounded' : ''
  const bgStyle = bg ? BG_COLORS[bg] : ''

  const classes = () => {
    return [
      'flex',
      directionStyle,
      justifyStyle,
      alignStyle,
      gapStyle,
      roundedClass,
      bgStyle,
      className,
    ].join(' ')
  }

  return React.createElement(containerType, { className: classes(), ...argRest }, children)
}
