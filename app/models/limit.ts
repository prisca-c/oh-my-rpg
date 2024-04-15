import type { DateTime } from 'luxon'
import { compose } from '@adonisjs/core/helpers'
import type { Opaque } from '@poppinss/utils/types'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'

import Event from '#models/event'
import World from '#models/world'

export type LimitId = Opaque<'limitId', string>

export default class Limit extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  declare id: LimitId

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

  @hasMany(() => Event)
  declare events: HasMany<typeof Event>

  @hasMany(() => World)
  declare worlds: HasMany<typeof World>
}
