import type { DateTime } from 'luxon'
import { compose } from '@adonisjs/core/helpers'
import type { Opaque } from '@poppinss/utils/types'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'

import Item from '#models/item'

export type ItemListId = Opaque<'itemListId', string>

export default class ItemList extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  declare id: ItemListId

  @column()
  declare name: string

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

  @manyToMany(() => Item, {
    pivotTable: 'item_item_lists',
    pivotColumns: ['drop_chance', 'only_boss'],
  })
  declare items: ManyToMany<typeof Item>
}
