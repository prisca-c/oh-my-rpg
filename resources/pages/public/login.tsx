import React from 'react'
import { router } from '@inertiajs/react'

import { Button } from '@/components/button'
import { Typography } from '@/components/utils/typography'

export default function Login() {
  const goToRegister = () => {
    router.visit('/register')
  }
  return (
    <div>
      <Typography type={'h1'} size={'5xl'} className={'font-bold text-center'}>
        Login
      </Typography>
      <Button onClick={goToRegister}>Register</Button>
    </div>
  )
}
