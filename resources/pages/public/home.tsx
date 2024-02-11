import { motion } from 'framer-motion'
import { router } from '@inertiajs/react'

import { Button } from '@/components/button'
import { FadeIn, Flex } from '@/components/utils'
import { LogoAnimation } from '@/components/logo_animation'

export default function Home() {
  const goToLogin = () => {
    router.visit('/login')
  }

  return (
    <Flex direction={'col'} justify={'center'} align={'center'} className={'h-full w-full gap-6'}>
      <LogoAnimation />
      <FadeIn delay={1.36} duration={0.8} slide={{ y: { start: 50, end: 0 } }}>
        <Button onClick={goToLogin}>Login</Button>
      </FadeIn>
    </Flex>
  )
}
