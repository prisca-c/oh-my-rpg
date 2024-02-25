import type { DateTime } from 'luxon'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'

import Item from '#models/item'

export default class ItemList extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Item, {
    pivotTable: 'items_item_lists',
    localKey: 'id',
    pivotForeignKey: 'item_list_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'item_id',
    pivotColumns: ['drop_chance', 'only_boss'],
  })
  declare items: ManyToMany<typeof Item>
}
