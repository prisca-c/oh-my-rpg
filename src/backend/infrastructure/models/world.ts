import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import db from '@adonisjs/lucid/services/db'
import { compose } from '@adonisjs/core/helpers'
import type { Opaque } from '@poppinss/utils/types'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
import type { HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, column, hasOne, manyToMany } from '@adonisjs/lucid/orm'

import Event from '#models/event'
import ItemList from '#models/item_list'
import Difficulty from '#models/difficulty'
import type { DifficultyId } from '#models/difficulty'
import type { WorldRequirements } from '#types/world_requirements'

export type WorldId = Opaque<'worldId', string>

export default class World extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  declare id: WorldId

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare isActive: boolean

  @column()
  declare requirements: WorldRequirements

  @column()
  declare image: string | null

  @column()
  declare maxDrop: number

  @column()
  declare difficultyId: DifficultyId

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

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
