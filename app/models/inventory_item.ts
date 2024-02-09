import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm'

import Item from '#models/item'
import Character from '#models/character'
import ItemSuffix from '#models/item_suffix'

export default class InventoryItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare characterId: string

  @column()
  declare itemId: string

  @column()
  declare quantity: number

  @column()
  declare hasSuffix: boolean

  @column()
  declare itemSuffixId: string

  @column()
  declare isEquipped: boolean

  @column()
  declare position: object

  @column()
  declare page: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateId(inventoryItem: InventoryItem) {
    inventoryItem.id = randomUUID()
  }

  @hasOne(() => Character)
  declare character: HasOne<typeof Character>

  @hasOne(() => Item)
  declare item: HasOne<typeof Item>

  @hasOne(() => ItemSuffix)
  declare itemSuffix: HasOne<typeof ItemSuffix>
}
