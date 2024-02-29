import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { Opaque } from '@poppinss/utils/types'
import type { HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, column, hasOne, manyToMany } from '@adonisjs/lucid/orm'

import Limit from '#models/limit'
import World from '#models/world'
import Difficulty from '#models/difficulty'
import type { DifficultyId } from '#models/difficulty'

export type EventId = Opaque<'eventId', string>

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  declare id: EventId

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare start: string

  @column()
  declare end: string

  @column()
  declare difficultyId: DifficultyId | null

  @column()
  declare limitAmount: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateId(event: Event) {
    event.id = randomUUID() as EventId
  }

  @hasOne(() => Difficulty)
  declare difficulty: HasOne<typeof Difficulty> | null

  @hasOne(() => Limit)
  declare limit: HasOne<typeof Limit>

  @manyToMany(() => World, {
    pivotTable: 'event_worlds',
    pivotColumns: ['is_active'],
  })
  declare worlds: ManyToMany<typeof World>
}
