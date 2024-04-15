import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import { compose } from '@adonisjs/core/helpers'
import type { Opaque } from '@poppinss/utils/types'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm'

import EntityProperty from '#models/entity_property'
import type { EnemyTypeId } from '#models/enemy_type'
import type { EntityPropertyId } from '#models/entity_property'

export type EnemyId = Opaque<'enemyId', string>

export default class Enemy extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  declare id: EnemyId

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare isBoss: boolean

  @column()
  declare enemyTypeId: EnemyTypeId

  @column()
  declare entityPropertyId: EntityPropertyId

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

  @beforeCreate()
  static async generateId(enemy: Enemy) {
    enemy.id = randomUUID() as EnemyId
  }

  @hasOne(() => EntityProperty)
  declare entityProperty: HasOne<typeof EntityProperty>
}
