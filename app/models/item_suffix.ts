import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import { BaseModel, beforeCreate, column, computed } from '@adonisjs/lucid/orm'

import ItemProperty from '#models/item_property'

export default class ItemSuffix extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare description: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateId(itemSuffix: ItemSuffix) {
    itemSuffix.id = randomUUID()
  }

  @computed()
  get properties(): object {
    return ItemProperty.findBy('entityId', this.id)
  }
}
