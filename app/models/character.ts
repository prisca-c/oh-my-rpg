import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, column, computed, hasOne } from '@adonisjs/lucid/orm'

import User from '#models/user'
import EntityProperty from '#models/entity_property'

export default class Character extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

  @column()
  declare name: string

  @column()
  declare entityPropertyId: string

  @column()
  declare level: number

  @column()
  declare experience: number

  @column()
  declare totalExperience: number

  @column()
  declare luckyCharm: DateTime

  @column()
  declare currency: number

  @column()
  declare deaths: number

  @column()
  declare enemiesKilled: number

  @column()
  declare bossesKilled: number

  @column()
  declare duelsWon: number

  @column()
  declare totalDuels: number

  @column()
  declare secretsItemsFound: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateEntityPropertyId(character: Character) {
    if (!character.$dirty.entityPropertyId) {
      const entityProperty = await EntityProperty.create({
        entityType: 'character',
      })

      character.entityPropertyId = entityProperty.id
    }
  }

  @beforeCreate()
  static async generateId(character: Character) {
    character.id = randomUUID()
  }

  @hasOne(() => User)
  declare user: HasOne<typeof User>

  @computed()
  get entityProperty() {
    return EntityProperty.find(this.entityPropertyId)
  }
}
