import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm'
import Item from '#models/item'
import World from '#models/world'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'

export default class ItemWorld extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare itemId: string

  @column()
  declare worldId: string

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
    itemWorld.id = randomUUID()
  }

  @hasOne(() => Item)
  declare item: HasOne<typeof Item>

  @hasOne(() => World)
  declare world: HasOne<typeof World>
}
