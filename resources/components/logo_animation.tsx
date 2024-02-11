import { LuSwords } from 'react-icons/lu'

import type { TextSizes } from '@/types'
import { FadeIn, Flex, Typography } from '@/components/utils'

type LogoAnimationProps = {
  textSizes?: TextSizes
  logoSize?: number
}

export const LogoAnimation = ({ textSizes = '3xl', logoSize = 50 }: LogoAnimationProps) => {
  return (
    <Flex justify={'center'} align={'center'} className={'gap-2 w-full'}>
      <FadeIn
        slide={{ x: { start: 50, end: 0 } }}
        delay={0.8}
        duration={0.8}
        opacity={{ start: 0, end: 1 }}
        className={'w-full'}
      >
        <Typography type={'p'} size={textSizes} className={'font-gamer'} align={'right'}>
          RPG
        </Typography>
      </FadeIn>
      <FadeIn
        delay={0}
        duration={0.8}
        scale={{ start: 0.5, end: 1 }}
        opacity={{ start: 0, end: 1 }}
      >
        <LuSwords size={logoSize} />
      </FadeIn>
      <FadeIn
        slide={{ x: { start: -50, end: 0 } }}
        delay={0.8}
        duration={0.8}
        opacity={{ start: 0, end: 1 }}
        className={'w-full'}
      >
        <Typography type={'p'} size={textSizes} className={'font-gamer'} align={'left'}>
          game
        </Typography>
      </FadeIn>
    </Flex>
  )
}
