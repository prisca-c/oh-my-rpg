import { route } from '#infrastructure/helpers/route'
import { getErrorByField } from '#infrastructure/helpers/session'
import { InputGroup } from '#domain/resources/components/form/input_group'
import { Button } from '#domain/resources/components/button'
import type { HttpContext } from '@adonisjs/core/http'

export const LoginPage = ({ ctx }: { ctx: HttpContext }) => {
  const submit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    console.log(route('login.post'))
    fetch(route('login.post'), {
      method: 'POST',
      body: formData,
    })
  }
  return (
    <div>
      <h1>Login</h1>
      <form method="POST" onsubmit={submit} class={'bg-amber-400'}>
        <input type="hidden" name="_csrf" value={ctx.request.csrfToken} />
        <InputGroup
          label={'Username'}
          name={'username'}
          type={'text'}
          id={'username'}
          error={getErrorByField(ctx, 'username')}
        />
        <InputGroup
          label={'Password'}
          name={'password'}
          type={'password'}
          id={'password'}
          error={getErrorByField(ctx, 'password')}
        />
        <Button type={'submit'}>Login</Button>
      </form>
    </div>
  )
}
