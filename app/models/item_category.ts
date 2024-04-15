import type { DateTime } from 'luxon'
import { compose } from '@adonisjs/core/helpers'
import type { Opaque } from '@poppinss/utils/types'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export type ItemCategoryId = Opaque<'itemCategoryId', number>

export default class ItemCategory extends compose(BaseModel, SoftDeletes) {
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

  @column.dateTime()
  declare deletedAt: DateTime | null
}
