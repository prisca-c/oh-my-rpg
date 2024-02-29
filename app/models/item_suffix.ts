import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { Opaque } from '@poppinss/utils/types'
import { BaseModel, beforeCreate, column, computed } from '@adonisjs/lucid/orm'

import ItemProperty from '#models/item_property'

export type ItemSuffixId = Opaque<'itemSuffixId', string>

export default class ItemSuffix extends BaseModel {
  @column({ isPrimary: true })
  declare id: ItemSuffixId

  @column()
  declare name: string

  @column()
  declare description: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateId(itemSuffix: ItemSuffix) {
    itemSuffix.id = randomUUID() as ItemSuffixId
  }

  @computed()
  get properties(): object {
    return ItemProperty.findBy('entityId', this.id)
  }
}
