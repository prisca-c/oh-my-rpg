import type { DateTime } from 'luxon'
import type { Opaque } from '@poppinss/utils/types'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export type ItemCategoryId = Opaque<'itemCategoryId', number>

export default class ItemCategory extends BaseModel {
  @column({ isPrimary: true })
  declare id: ItemCategoryId

  @column()
  declare name: string

  @column()
  declare inventorySpaceHeight: number

  @column()
  declare inventorySpaceWidth: number

  @column()
  declare isStackable: boolean

  @column()
  declare isEquippable: boolean

  @column()
  declare isUsable: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime
}
