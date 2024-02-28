import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { Opaque } from '@poppinss/utils/types'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, column, hasOne, computed, hasMany } from '@adonisjs/lucid/orm'

import ItemList from '#models/item_list'
import ItemBase from '#models/item_base'
import ItemRarity from '#models/item_rarity'
import ItemProperty from '#models/item_property'
import type { ItemBaseId } from '#models/item_base'
import type { ItemRarityId } from '#models/item_rarity'

export type ItemId = Opaque<'itemId', string>

export default class Item extends BaseModel {
  @column({ isPrimary: true })
  declare id: ItemId

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare level: number

  @column()
  declare isActive: boolean

  @column()
  declare isTradeable: boolean

  @column()
  declare itemBaseId: ItemBaseId

  @column()
  declare itemRarityId: ItemRarityId

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateId(item: Item) {
    item.id = randomUUID() as ItemId
  }

  @hasOne(() => ItemBase)
  declare itemBase: HasOne<typeof ItemBase>

  @hasOne(() => ItemRarity)
  declare itemRarity: HasOne<typeof ItemRarity>

  @hasMany(() => ItemList)
  declare itemLists: HasMany<typeof ItemList>

  @computed()
  get properties(): object {
    return ItemProperty.findBy('entityId', this.id)
  }
}
