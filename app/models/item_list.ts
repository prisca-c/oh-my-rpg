import type { DateTime } from 'luxon'
import type { Opaque } from '@poppinss/utils/types'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'

import Item from '#models/item'

export type ItemListId = Opaque<'itemListId', string>

export default class ItemList extends BaseModel {
  @column({ isPrimary: true })
  declare id: ItemListId

  @column()
  declare name: string

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Item, {
    pivotTable: 'item_item_lists',
    pivotColumns: ['drop_chance', 'only_boss'],
  })
  declare items: ManyToMany<typeof Item>
}
