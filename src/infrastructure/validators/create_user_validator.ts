import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { uniqueRule } from '#validators/rules/unique'

export const createUserValidator = (data: {
  username: string
  email: string
  password: string
}) => {
  const schema = vine.object({
    username: vine
      .string()
      .trim()
      .minLength(3)
      .maxLength(20)
      .use(uniqueRule({ table: 'users', column: 'username' })),
    email: vine
      .string()
      .email()
      .trim()
      .use(uniqueRule({ table: 'users', column: 'email' })),
    password: vine.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,250}$/),
  })

  const messagesProvider = new SimpleMessagesProvider({
    'username.required': 'Username is required',
    'username.unique': 'This username is already taken',
    'username.maxLength': 'The username must be less than 20 characters',
    'username.minLength': 'The username must be at least 3 characters',
    'email.required': 'Email is required',
    'email.unique': 'This email is already taken',
    'email.email': 'Email is invalid',
    'password.required': 'Password is required',
    'password.regex':
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })

  return vine.validate({ schema, data, messagesProvider })
}
