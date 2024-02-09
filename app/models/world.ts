import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm'

import Event from '#models/event'

export default class World extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare is_event: boolean

  @column()
  declare event_id: string

  @column()
  declare is_active: boolean

  @column()
  declare requirement: object

  @column()
  declare max_drop: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateId(world: World) {
    world.id = randomUUID()
  }

  @hasOne(() => Event)
  declare event: HasOne<typeof Event>
}
