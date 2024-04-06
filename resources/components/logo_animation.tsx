import { LuSwords } from 'react-icons/lu'

import type { TextSizes } from '#resources/types/index'
import { Container, FadeIn, Typography } from '#components/utils/index'

type LogoAnimationProps = {
  textSizes?: TextSizes
  logoSize?: number
}

export const LogoAnimation = ({ textSizes = '3xl', logoSize = 50 }: LogoAnimationProps) => {
  return (
    <Container layout={'flex'} direction={'col'} justify={'center'} align={'center'}>
      <FadeIn
        delay={0}
        duration={0.8}
        scale={{ start: 0.5, end: 1 }}
        opacity={{ start: 0, end: 1 }}
      >
        <LuSwords size={logoSize} />
      </FadeIn>
      <FadeIn
        slide={{ y: { start: -50, end: 0 } }}
        delay={0.8}
        duration={0.8}
        opacity={{ start: 0, end: 1 }}
        className={'w-full'}
      >
        <Typography type={'p'} size={textSizes} className={'font-gamer'}>
          RPG game
        </Typography>
      </FadeIn>
    </Container>
  )
}
