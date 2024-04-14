import React from 'react'

import { BgColors } from '#resources/enums/tailwind'
import { Container } from '#components/utils/container'

type CardProps = {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  color?: keyof typeof BgColors
}

export const Card = (props: CardProps) => {
  const { children, size = 'md', color = 'white' } = props

  const sizes = {
    sm: 'w-[100px] h-[100px]',
    md: 'w-[200px] h-[200px]',
    lg: 'w-[300px] h-[300px]',
  }

  const bg = BgColors[color]

  const base = 'p-4'

  const className = `${base} ${sizes[size]} ${bg}`

  return (
    <Container
      layout={'flex'}
      direction={'col'}
      justify={'center'}
      align={'center'}
      gap={6}
      className={className}
      rounded
    >
      {children}
    </Container>
  )
}
