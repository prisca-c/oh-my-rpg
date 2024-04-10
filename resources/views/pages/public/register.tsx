import { Typography } from '#components/utils/index'
import { RegisterForm } from '#components/auth/register_form'

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
