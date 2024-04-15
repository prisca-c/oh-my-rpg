import type { DateTime } from 'luxon'
import { compose } from '@adonisjs/core/helpers'
import type { Opaque } from '@poppinss/utils/types'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export type EnemyTypeId = Opaque<'enemyTypeId', string>

export default class EnemyType extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  declare id: EnemyTypeId

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null
}
