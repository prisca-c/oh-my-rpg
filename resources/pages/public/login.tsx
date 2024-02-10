import React from 'react'

import { Typography } from '@/components/utils/'
import { LoginForm } from '@/components/login/login_form'

export default function Login() {
  return (
    <div>
      <Typography type={'h1'} size={'5xl'} className={'font-bold text-center'}>
        Login
      </Typography>
      <LoginForm />
    </div>
  )
}
