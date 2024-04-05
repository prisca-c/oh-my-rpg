import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { Opaque } from '@poppinss/utils/types'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'

import Item from '#models/item'
import { Size } from '#types/size'
import ItemBase from '#models/item_base'
import Character from '#models/character'
import type { ItemId } from '#models/item'
import ItemSuffix from '#models/item_suffix'
import type { Position } from '#types/position'
import ItemCategory from '#models/item_category'
import type { CharacterId } from '#models/character'
import type { ItemSuffixId } from '#models/item_suffix'
import { InventoryManager } from '#features/inventory/inventory_manager'

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
  declare position: Position | null

  @column()
  declare page: number | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @belongsTo(() => Character)
  declare character: BelongsTo<typeof Character>

  @belongsTo(() => Item)
  declare item: BelongsTo<typeof Item>

  @belongsTo(() => ItemSuffix)
  declare itemSuffix: BelongsTo<typeof ItemSuffix>

  @beforeCreate()
  static generateId(inventoryItem: InventoryItem) {
    inventoryItem.id = randomUUID() as InventoryItemId
  }

  @beforeCreate()
  static async setPosition(inventoryItem: InventoryItem) {
    if (!inventoryItem.position) {
      const character = await Character.findOrFail(inventoryItem.characterId)
      const inventoryManager = new InventoryManager()
      const position = await inventoryManager.handle(character, inventoryItem)

      if (!position) {
        inventoryItem.position = null
        inventoryItem.page = null
        return
      }

      inventoryItem.position = { x: position.x, y: position.y }
      inventoryItem.page = position.page
    }
  }

  async size(): Promise<Size> {
    const item = await Item.findOrFail(this.itemId)
    const itemBase = await ItemBase.findOrFail(item.itemBaseId)
    const itemCategory = await ItemCategory.findOrFail(itemBase.itemCategoryId)
    const width = itemCategory.inventorySpaceWidth
    const height = itemCategory.inventorySpaceHeight
    return { width, height }
  }
}
