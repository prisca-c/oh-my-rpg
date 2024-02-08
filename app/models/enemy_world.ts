import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'

export default class EnemyWorld extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare enemyId: string

  @column()
  declare worldId: string

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateId(enemyWorld: EnemyWorld) {
    enemyWorld.id = randomUUID()
  }
}
