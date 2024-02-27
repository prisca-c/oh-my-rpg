import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import { BaseModel, beforeCreate, column, computed } from '@adonisjs/lucid/orm'

import Character from '#models/character'
import EnemyType from '#models/enemy_type'
import { Entity } from '#enums/entity.enum'

export default class EntityProperty extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare entityType: string

  @column()
  declare constitution: number

  @column()
  declare strength: number

  @column()
  declare dexterity: number

  @column()
  declare intelligence: number

  @column()
  declare wisdom: number

  @column()
  declare charisma: number

  @column()
  declare luck: number

  @column()
  declare perception: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateId(entityProperty: EntityProperty) {
    entityProperty.id = randomUUID()
  }

  @computed()
  get entity() {
    if (this.entityType === Entity.CHARACTER) {
      return Character.findBy('entityPropertyId', this.id)
    } else if (this.entityType === Entity.ENEMY) {
      return EnemyType.findBy('entityPropertyId', this.id)
    }
  }
}
