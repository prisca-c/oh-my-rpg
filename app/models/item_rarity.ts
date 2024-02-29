import type { DateTime } from 'luxon'
import type { Opaque } from '@poppinss/utils/types'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export type ItemRarityId = Opaque<'itemRarityId', number>

export default class ItemRarity extends BaseModel {
  @column({ isPrimary: true })
  declare id: ItemRarityId

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime
}
