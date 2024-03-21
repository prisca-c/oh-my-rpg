import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { Opaque } from '@poppinss/utils/types'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm'

import ItemCategory from '#models/item_category'
import EntityProperty from '#models/entity_property'
import type { ItemCategoryId } from '#models/item_category'
import type { EntityPropertyId } from '#models/entity_property'

export type ItemBaseId = Opaque<'itemBaseId', string>

export default class ItemBase extends BaseModel {
  @column({ isPrimary: true })
  declare id: ItemBaseId

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare image: string | null

  @column()
  declare itemCategoryId: ItemCategoryId

  @column()
  declare entityPropertyId: EntityPropertyId

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateId(itemBase: ItemBase) {
    itemBase.id = randomUUID() as ItemBaseId
  }

  @hasOne(() => ItemCategory)
  declare itemCategory: HasOne<typeof ItemCategory>

  @hasOne(() => EntityProperty)
  declare entityProperty: HasOne<typeof EntityProperty>
}
