import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import db from '@adonisjs/lucid/services/db'
import type { Opaque } from '@poppinss/utils/types'
import type { HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, column, hasOne, manyToMany } from '@adonisjs/lucid/orm'

import Event from '#models/event'
import ItemList from '#models/item_list'
import Difficulty from '#models/difficulty'
import type { EventId } from '#models/event'
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

  @manyToMany(() => Event, {
    pivotTable: 'event_worlds',
    pivotColumns: ['is_active'],
  })
  declare events: ManyToMany<typeof Event>

  @manyToMany(() => ItemList, {
    pivotTable: 'item_list_worlds',
  })
  declare itemLists: ManyToMany<typeof ItemList>

  async linkToItemList(itemList: ItemList) {
    await db.insertQuery().table('item_list_worlds').insert({
      id: randomUUID(),
      world_id: this.id,
      item_list_id: itemList.id,
      is_active: true,
      created_at: DateTime.now(),
      updated_at: DateTime.now(),
    })
  }
}
