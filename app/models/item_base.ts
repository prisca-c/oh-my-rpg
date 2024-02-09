import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm'

import ItemCategory from '#models/item_category'
import EntityProperty from '#models/entity_property'

export default class ItemBase extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare itemCategoryId: number

  @column()
  declare entityPropertyId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateId(itemBase: ItemBase) {
    itemBase.id = randomUUID()
  }

  @hasOne(() => ItemCategory)
  declare itemCategory: HasOne<typeof ItemCategory>

  @hasOne(() => EntityProperty)
  declare entityProperty: HasOne<typeof EntityProperty>
}
