import { LuSwords } from 'react-icons/lu'

import { FadeIn, Flex, Typography } from '@/components/utils'

export const LogoAnimation = () => {
  return (
    <Flex justify={'center'} align={'center'} className={'gap-2 w-full'}>
      <FadeIn
        slide={{ x: { start: 50, end: 0 } }}
        delay={0.8}
        duration={0.8}
        opacity={{ start: 0, end: 1 }}
        className={'w-full'}
      >
        <Typography type={'p'} size={'3xl'} className={'font-gamer'} align={'right'}>
          RPG
        </Typography>
      </FadeIn>
      <FadeIn
        delay={0}
        duration={0.8}
        scale={{ start: 0.5, end: 1 }}
        opacity={{ start: 0, end: 1 }}
      >
        <LuSwords size={50} />
      </FadeIn>
      <FadeIn
        slide={{ x: { start: -50, end: 0 } }}
        delay={0.8}
        duration={0.8}
        opacity={{ start: 0, end: 1 }}
        className={'w-full'}
      >
        <Typography type={'p'} size={'3xl'} className={'font-gamer'} align={'left'}>
          game
        </Typography>
      </FadeIn>
    </Flex>
  )
}
