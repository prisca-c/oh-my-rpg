import { route } from '#infrastructure/helpers/route'
import { getErrorByField } from '#infrastructure/helpers/session'
import { InputGroup } from '#domain/resources/components/form/input_group'
import { Button } from '#domain/resources/components/button'
import type { HttpContext } from '@adonisjs/core/http'
import { Form } from '#domain/resources/components/form/form'

export const LoginPage = ({ ctx }: { ctx: HttpContext }) => {
  const submit = async (e: Event) => {
    e.preventDefault()
    const form = e.currentTarget
    // @ts-ignore
    const formData = new FormData(form)
    await fetch(route('login.post'), {
      method: 'POST',
      body: formData,
    })
  }

  return (
    <div>
      <h1>Login</h1>
      <Form method="POST" onSubmit={submit}>
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
      </Form>
    </div>
  )
}
