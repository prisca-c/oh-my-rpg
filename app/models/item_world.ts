import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import { compose } from '@adonisjs/core/helpers'
import type { Opaque } from '@poppinss/utils/types'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm'

import Item from '#models/item'
import World from '#models/world'
import type { ItemId } from '#models/item'
import type { WorldId } from '#models/world'

export type ItemWorldId = Opaque<'itemWorldId', string>

export default class ItemWorld extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  declare id: ItemWorldId

  @column()
  declare itemId: ItemId

  @column()
  declare worldId: WorldId

  @column()
  declare dropChance: number

  @column()
  declare onlyBoss: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

  @beforeCreate()
  static async generateId(itemWorld: ItemWorld) {
    itemWorld.id = randomUUID() as ItemWorldId
  }

  @hasOne(() => Item)
  declare item: HasOne<typeof Item>

  @hasOne(() => World)
  declare world: HasOne<typeof World>
}
