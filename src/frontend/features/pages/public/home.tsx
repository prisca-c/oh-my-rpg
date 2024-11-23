import { router } from '@inertiajs/react'

import { Button } from '~/common/components/button'
import { FadeIn, Flex } from '~/common/components/utils'
import { LogoAnimation } from '~/common/components/logo_animation'

export default function Home() {
  const goToLogin = () => {
    router.visit('/login')
  }

  return (
    <Flex direction={'col'} justify={'center'} align={'center'} className={'h-full w-full gap-6'}>
      <LogoAnimation textSizes={'6xl'} logoSize={80} />
      <FadeIn delay={1.36} duration={0.5} slide={{ y: { start: 50, end: 0 } }}>
        <Button onClick={goToLogin}>Play now</Button>
      </FadeIn>
    </Flex>
  )
}
