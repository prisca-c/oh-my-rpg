import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm'
import EntityProperty from '#models/entity_property'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'

export default class Enemy extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare isBoss: boolean

  @column()
  declare enemyTypeId: number

  @column()
  declare entityPropertyId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateId(enemy: Enemy) {
    enemy.id = randomUUID()
  }

  @hasOne(() => EntityProperty)
  declare entityProperty: HasOne<typeof EntityProperty>
}
