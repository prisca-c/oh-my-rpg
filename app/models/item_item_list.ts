import type { DateTime } from 'luxon'
import type { Opaque } from '@poppinss/utils/types'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'

import Item from '#models/item'
import ItemList from '#models/item_list'
import type { ItemId } from '#models/item'
import type { ItemListId } from '#models/item_list'

export type ItemItemListId = Opaque<'itemItemListId', string>

export default class ItemItemList extends BaseModel {
  @column({ isPrimary: true })
  declare id: ItemItemListId

  @column()
  declare dropChance: number

  @column()
  declare onlyBoss: boolean

  @column()
  declare itemId: ItemId

  @column()
  declare itemListId: ItemListId

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Item)
  declare item: HasOne<typeof Item>

  @hasOne(() => ItemList)
  declare itemList: HasOne<typeof ItemList>
}
