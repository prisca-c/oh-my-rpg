import { getErrorByField } from '#infrastructure/helpers/session'
import { route } from 'adonisjsx'
import { Typography } from '#domain/resources/components/utils/typography'
import { Center } from '#domain/resources/components/utils/center'
import { InputGroup } from '#domain/resources/components/form/input_group'
import { Button } from '#domain/resources/components/button'
import { Form } from '#domain/resources/components/form/form'
import { csrfField } from 'adonisjsx'
import type { HttpContext } from '@adonisjs/core/http'

export const RegisterPage = ({ ctx }: { ctx: HttpContext }) => {
  const submit = async (e: Event) => {
    e.preventDefault()
    const form = e.currentTarget
    // @ts-ignore
    const formData = new FormData(form)
    await fetch(route('register.post'), {
      method: 'POST',
      body: formData,
    })
  }

  return (
    <Center>
      <Typography type={'h1'} size={'4xl'} className={'font-bold'}>
        Register
      </Typography>
      <Form method={'POST'} onSubmit={submit} textCenter>
        {csrfField()}
        <InputGroup
          label={'Username'}
          name={'username'}
          type={'text'}
          id={'username'}
          error={getErrorByField('username', ctx)}
        />
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
        <InputGroup
          label={'Password Confirmation'}
          name={'password_confirmation'}
          type={'password'}
          id={'password_confirmation'}
          error={getErrorByField('password_confirmation', ctx)}
        />
        <Center middle={false}>
          <div class={'mt-2'}>
            <Button type={'submit'}>Register</Button>
          </div>
        </Center>
      </Form>
    </Center>
  )
}
