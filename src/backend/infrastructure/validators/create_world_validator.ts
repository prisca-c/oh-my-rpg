import vine, { SimpleMessagesProvider } from '@vinejs/vine'

import { uniqueRule } from '#validators/rules/index'
import type { WorldRequirements } from '#types/world_requirements'

type CreateWorldValidatorData = {
  name: string
  description: string
  maxDrop: number
  requirements: WorldRequirements
  difficultyId: string
  image: string
  isActive: boolean
}

export const createWorldValidator = (data: CreateWorldValidatorData) => {
  const schema = vine.object({
    name: vine.string().use(uniqueRule({ table: 'worlds', column: 'name' })),
    description: vine.string(),
    maxDrop: vine.number().nullable(),
    requirements: vine.object({
      level: vine.number(),
    }),
    difficultyId: vine.string(),
    image: vine.string().nullable(),
    isActive: vine.boolean().nullable(),
  })

  const messagesProvider = new SimpleMessagesProvider({
    'name.required': 'Name is required',
    'name.unique': 'This name is already taken',
    'description.required': 'Description is required',
    'maxDrop.required': 'Max drop is required',
    'requirements.required': 'Requirements is required',
    'difficultyId.required': 'Difficulty ID is required',
    'image.required': 'Image is required',
    'isActive.required': 'Is active is required',
  })

  return vine.validate({ schema, data, messagesProvider })
}
