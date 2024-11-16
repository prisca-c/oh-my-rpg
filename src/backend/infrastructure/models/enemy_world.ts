import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import { compose } from '@adonisjs/core/helpers'
import type { Opaque } from '@poppinss/utils/types'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'

import type { EnemyId } from '#models/enemy'
import type { WorldId } from '#models/world'

export type EnemyWorldId = Opaque<'enemyWorldId', string>

export default class EnemyWorld extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  declare id: EnemyWorldId

  @column()
  declare enemyId: EnemyId

  @column()
  declare worldId: WorldId

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

  @beforeCreate()
  static async generateId(enemyWorld: EnemyWorld) {
    enemyWorld.id = randomUUID() as EnemyWorldId
  }
}
