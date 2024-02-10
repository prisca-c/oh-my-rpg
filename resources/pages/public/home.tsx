import { router } from '@inertiajs/react'

import { Button } from '@/components/button'
import { Flex, Typography } from '@/components/utils'

export default function Home() {
  const goToLogin = () => {
    router.visit('/login')
  }

  return (
    <Flex direction={'col'} justify={'center'} align={'center'} className={'h-full gap-6'}>
      <Typography type={'h1'} size={'5xl'} className={'font-bold text-center'}>
        Hello World
      </Typography>
      <Button onClick={goToLogin}>Login</Button>
    </Flex>
  )
}
