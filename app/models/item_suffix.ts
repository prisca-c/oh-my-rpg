import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, computed } from '@adonisjs/lucid/orm'
import ItemProperty from '#models/item_property'
import { randomUUID } from 'node:crypto'

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
