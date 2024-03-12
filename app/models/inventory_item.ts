import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { Opaque } from '@poppinss/utils/types'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'

import Item from '#models/item'
import Character from '#models/character'
import type { ItemId } from '#models/item'
import ItemSuffix from '#models/item_suffix'
import type { Position } from '#types/position'
import type { CharacterId } from '#models/character'
import type { ItemSuffixId } from '#models/item_suffix'

export type InventoryItemId = Opaque<'inventoryItemId', string>

export default class InventoryItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: InventoryItemId

  @column()
  declare characterId: CharacterId

  @column()
  declare itemId: ItemId

  @column()
  declare quantity: number

  @column()
  declare hasSuffix: boolean

  @column()
  declare itemSuffixId: ItemSuffixId | null

  @column()
  declare isEquipped: boolean

  @column()
  declare position: Position

  @column()
  declare page: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateId(inventoryItem: InventoryItem) {
    inventoryItem.id = randomUUID() as InventoryItemId
  }

  @belongsTo(() => Character)
  declare character: BelongsTo<typeof Character>

  @belongsTo(() => Item)
  declare item: BelongsTo<typeof Item>

  @belongsTo(() => ItemSuffix)
  declare itemSuffix: BelongsTo<typeof ItemSuffix>
}
