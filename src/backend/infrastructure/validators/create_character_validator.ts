import vine, { SimpleMessagesProvider } from '@vinejs/vine'

import { uniqueRule, existsRule, relationCountRule } from '#validators/rules/index'

type CreateCharacterValidatorData = {
  name: string
  userId: string
}

export const createCharacterValidator = (data: CreateCharacterValidatorData) => {
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
    userId: vine
      .string()
      .use(existsRule({ table: 'users', column: 'id' }))
      .use(relationCountRule({ table: 'characters', column: 'user_id', maxCount: 3 })),
  })

  const messagesProvider = new SimpleMessagesProvider({
    'name.required': 'Name is required',
    'name.unique': 'This name is already taken',
    'name.alphaNum': 'The name can only contain letters, numbers, dashes and underscores',
    'name.maxLength': 'The name must be less than 20 characters',
    'name.minLength': 'The name must be at least 3 characters',
    'userId.required': 'User ID is required',
    'userId.exists': 'User does not exist',
    'userId.relationCount': 'You can only have 3 characters',
  })

  return vine.validate({ schema, data, messagesProvider })
}
