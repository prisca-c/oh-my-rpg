import { csrfField, route } from 'adonisjsx'
import { getErrorByField } from '#infrastructure/helpers/session'
import { InputGroup } from '#domain/resources/components/form/input_group'
import { Button } from '#domain/resources/components/button'
import type { HttpContext } from '@adonisjs/core/http'
import { Form } from '#domain/resources/components/form/form'
import { Typography } from '#domain/resources/components/utils/typography'

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
      <Typography type={'h1'} size={'4xl'} className={'font-bold'}>
        Login
      </Typography>
      <Form method="POST" onSubmit={submit} textCenter>
        {csrfField()}
        <InputGroup
          label={'Email'}
          name={'email'}
          type={'email'}
          id={'email'}
          error={getErrorByField('email', ctx)}
        />
        <InputGroup
          label={'Password'}
          name={'password'}
          type={'password'}
          id={'password'}
          error={getErrorByField('password', ctx)}
        />
        <Button type={'submit'}>Login</Button>
      </Form>
    </div>
  )
}
