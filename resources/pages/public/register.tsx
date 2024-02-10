import React from 'react'

import { Typography } from '@/components/utils'
import { RegisterForm } from '@/components/register/register_form'

export default function Register() {
  return (
    <div>
      <Typography type={'h1'} size={'5xl'} className={'font-bold text-center'}>
        Register
      </Typography>
      <RegisterForm />
    </div>
  )
}
