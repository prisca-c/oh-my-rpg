import { Typography } from '~/common/components/utils'
import { RegisterForm } from '~/features/auth/register_form'

export default function RegisterPage() {
  return (
    <div>
      <Typography type={'h1'} size={'5xl'} className={'text-center font-bold'}>
        Register
      </Typography>
      <RegisterForm />
    </div>
  )
}
