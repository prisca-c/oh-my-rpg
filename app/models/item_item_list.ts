import type { DateTime } from 'luxon'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'

import Item from '#models/item'
import ItemList from '#models/item_list'

export default class ItemItemList extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare dropChance: number

  @column()
  declare onlyBoss: boolean

  @column()
  declare itemId: string

  @column()
  declare itemListId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Item)
  declare item: HasOne<typeof Item>

  @belongsTo(() => ItemList)
  declare itemList: BelongsTo<typeof ItemList>
}
