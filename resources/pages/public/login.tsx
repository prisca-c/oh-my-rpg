import { router } from '@inertiajs/react'

import { Button } from '@/components/button'

export default function Login() {
  const goToRegister = () => {
    router.visit('/register')
  }
  return (
    <div>
      <h1>Login</h1>
      <Button onClick={goToRegister}>Register</Button>
    </div>
  )
}
