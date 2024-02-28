import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { Opaque } from '@poppinss/utils/types'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm'

import Item from '#models/item'
import World from '#models/world'
import type { ItemId } from '#models/item'
import type { WorldId } from '#models/world'

export type ItemWorldId = Opaque<'itemWorldId', string>

export default class ItemWorld extends BaseModel {
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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateId(itemWorld: ItemWorld) {
    itemWorld.id = randomUUID() as ItemWorldId
  }

  @hasOne(() => Item)
  declare item: HasOne<typeof Item>

  @hasOne(() => World)
  declare world: HasOne<typeof World>
}
