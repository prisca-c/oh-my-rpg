import { Typography } from '~/common/components/utils'
import { LoginForm } from '~/features/auth/login_form'

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
