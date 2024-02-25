import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, column, hasOne, manyToMany, computed } from '@adonisjs/lucid/orm'

import ItemBase from '#models/item_base'
import ItemList from '#models/item_list'
import ItemRarity from '#models/item_rarity'
import ItemProperty from '#models/item_property'

export default class Item extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare level: number

  @column()
  declare is_active: boolean

  @column()
  declare is_tradeable: boolean

  @column()
  declare itemBaseId: string

  @column()
  declare itemRarityId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateId(item: Item) {
    item.id = randomUUID()
  }

  @hasOne(() => ItemBase)
  declare itemBase: HasOne<typeof ItemBase>

  @hasOne(() => ItemRarity)
  declare itemRarity: HasOne<typeof ItemRarity>

  @manyToMany(() => ItemList, {
    pivotTable: 'items_item_lists',
    localKey: 'id',
    pivotForeignKey: 'item_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'item_list_id',
  })
  declare itemLists: ManyToMany<typeof ItemList>

  @computed()
  get properties(): object {
    return ItemProperty.findBy('entityId', this.id)
  }
}
