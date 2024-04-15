import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import { compose } from '@adonisjs/core/helpers'
import type { Opaque } from '@poppinss/utils/types'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm'

import ItemCategory from '#models/item_category'
import EntityProperty from '#models/entity_property'
import type { ItemCategoryId } from '#models/item_category'
import type { EntityPropertyId } from '#models/entity_property'

export type ItemBaseId = Opaque<'itemBaseId', string>

export default class ItemBase extends compose(BaseModel, SoftDeletes) {
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

  @column.dateTime()
  declare deletedAt: DateTime | null

  @beforeCreate()
  static async generateId(itemBase: ItemBase) {
    itemBase.id = randomUUID() as ItemBaseId
  }

  @hasOne(() => ItemCategory)
  declare itemCategory: HasOne<typeof ItemCategory>

  @hasOne(() => EntityProperty)
  declare entityProperty: HasOne<typeof EntityProperty>
}
