import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm'
import Character from '#models/character'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'

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

  @hasOne(() => Character)
  declare character: HasOne<typeof Character>
}
