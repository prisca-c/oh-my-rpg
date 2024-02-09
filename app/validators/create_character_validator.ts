import vine, { SimpleMessagesProvider } from '@vinejs/vine'

import { uniqueRule } from './rules/unique.js'

export const createCharacterValidator = (data: { name: string }) => {
  const schema = vine.object({
    name: vine
      .string()
      .trim()
      .minLength(3)
      .maxLength(20)
      .alphaNumeric({
        allowDashes: true,
        allowUnderscores: true,
      })
      .use(uniqueRule({ table: 'characters', column: 'name' })),
  })

  const messagesProvider = new SimpleMessagesProvider({
    'name.required': 'Name is required',
    'name.unique': 'This name is already taken',
    'name.alphaNum': 'The name can only contain letters, numbers, dashes and underscores',
    'name.maxLength': 'The name must be less than 20 characters',
    'name.minLength': 'The name must be at least 3 characters',
  })

  return vine.validate({ schema, data, messagesProvider })
}
