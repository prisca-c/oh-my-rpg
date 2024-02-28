import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { Opaque } from '@poppinss/utils/types'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, column, hasMany, hasOne } from '@adonisjs/lucid/orm'

import Event from '#models/event'
import ItemList from '#models/item_list'
import Difficulty from '#models/difficulty'
import type { EventId } from '#models/event'
import type { ItemListId } from '#models/item_list'
import type { DifficultyId } from '#models/difficulty'

export type WorldId = Opaque<'worldId', string>

export default class World extends BaseModel {
  @column({ isPrimary: true })
  declare id: WorldId

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare isEvent: boolean

  @column()
  declare eventID: EventId | null

  @column()
  declare isActive: boolean

  @column()
  declare requirements: object

  @column()
  declare maxDrop: number

  @column()
  declare itemListId: ItemListId | null

  @column()
  declare difficultyId: DifficultyId

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateId(world: World) {
    world.id = randomUUID() as WorldId
  }

  @hasOne(() => Difficulty)
  declare difficulty: HasOne<typeof Difficulty>

  @hasOne(() => Event)
  declare event: HasOne<typeof Event>

  @hasMany(() => ItemList, {
    foreignKey: 'item_list_id',
    localKey: 'item_list_id',
  })
  declare items: HasMany<typeof ItemList>
}
