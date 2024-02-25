import type { DateTime } from 'luxon'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'

import Item from '#models/item'
import ItemList from '#models/item_list'

export default class ItemItemList extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare drop_chance: number

  @column()
  declare only_boss: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Item)
  declare item: HasOne<typeof Item>

  @hasOne(() => ItemList)
  declare itemList: HasOne<typeof ItemList>
}
