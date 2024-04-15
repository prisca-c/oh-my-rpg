import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import { compose } from '@adonisjs/core/helpers'
import type { Opaque } from '@poppinss/utils/types'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
import { BaseModel, beforeCreate, column, computed } from '@adonisjs/lucid/orm'

import ItemProperty from '#models/item_property'

export type ItemSuffixId = Opaque<'itemSuffixId', string>

export default class ItemSuffix extends compose(BaseModel, SoftDeletes) {
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

  @column.dateTime()
  declare deletedAt: DateTime | null

  @beforeCreate()
  static async generateId(itemSuffix: ItemSuffix) {
    itemSuffix.id = randomUUID() as ItemSuffixId
  }

  @computed()
  get properties(): object {
    return ItemProperty.findBy('entityId', this.id)
  }
}
