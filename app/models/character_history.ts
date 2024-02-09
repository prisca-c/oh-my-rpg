import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm'

import Character from '#models/character'
import HistoryType from '#models/history_type'

export default class CharacterHistory extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare characterId: string

  @column()
  declare historyTypeId: number

  @column()
  declare payload: object

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateId(characterHistory: CharacterHistory) {
    characterHistory.id = randomUUID()
  }

  @hasOne(() => HistoryType)
  declare historyType: HasOne<typeof HistoryType>

  @hasOne(() => Character)
  declare character: HasOne<typeof Character>
}
