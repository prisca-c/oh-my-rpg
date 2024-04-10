import React from 'react'

import { Container } from '#components/utils/container'

type CardProps = {
  children: React.ReactNode
}

export const Card = (props: CardProps) => {
  const { children } = props

  return (
    <Container
      layout={'flex'}
      direction={'col'}
      justify={'center'}
      align={'center'}
      gap={6}
      className={'bg-white p-4 w-[200px] h-[200px]'}
      rounded
    >
      {children}
    </Container>
  )
}
