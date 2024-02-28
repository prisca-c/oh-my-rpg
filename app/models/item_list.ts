import type { DateTime } from 'luxon'
import type { Opaque } from '@poppinss/utils/types'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'

import Item from '#models/item'
import ItemItemList from '#models/item_item_list'

export type ItemListId = Opaque<'itemListId', string>

export default class ItemList extends BaseModel {
  @column({ isPrimary: true })
  declare id: ItemListId

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => ItemItemList, {
    foreignKey: 'item_list_id',
    localKey: 'id',
  })
  declare itemItemList: HasMany<typeof ItemItemList>

  @manyToMany(() => Item, {
    pivotTable: 'item_item_list',
  })
  declare items: ManyToMany<typeof Item>
}
