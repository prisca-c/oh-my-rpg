import { getErrorByField } from '#infrastructure/helpers/session'
import { route } from '#infrastructure/helpers/route'
import { Typography } from '#domain/resources/components/utils/typography'
import { Center } from '#domain/resources/components/utils/center'
import { InputGroup } from '#domain/resources/components/form/input_group'
import { Button } from '#domain/resources/components/button'
import { HttpContext } from '@adonisjs/core/http'

export const RegisterPage = ({ ctx }: { ctx: HttpContext }) => {
  const submit = (e: { preventDefault: () => void; currentTarget: any }) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    fetch(route('register.post'), {
      method: 'POST',
      body: formData,
    })
  }

  return (
    <Center>
      <Typography type={'h1'}>Register</Typography>
      <form method="POST" onsubmit={submit}>
        <input type="hidden" name="_csrf" value={ctx.request.csrfToken} />
        <InputGroup
          label={'Username'}
          name={'username'}
          type={'text'}
          id={'username'}
          error={getErrorByField(ctx, 'username')}
        />
        <InputGroup
          label={'Email'}
          name={'email'}
          type={'email'}
          id={'email'}
          error={getErrorByField(ctx, 'email')}
        />
        <InputGroup
          label={'Password'}
          name={'password'}
          type={'password'}
          id={'password'}
          error={getErrorByField(ctx, 'password')}
        />
        <InputGroup
          label={'Password Confirmation'}
          name={'password_confirmation'}
          type={'password'}
          id={'password_confirmation'}
          error={getErrorByField(ctx, 'password_confirmation')}
        />
        <Center middle={false}>
          <Button type={'submit'}>Register</Button>
        </Center>
      </form>
    </Center>
  )
}
