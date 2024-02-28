import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { Opaque } from '@poppinss/utils/types'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm'

import Character from '#models/character'
import HistoryType from '#models/history_type'
import type { CharacterId } from '#models/character'
import type { HistoryTypeId } from '#models/history_type'

export type CharacterHistoryId = Opaque<'characterHistoryId', string>

export default class CharacterHistory extends BaseModel {
  @column({ isPrimary: true })
  declare id: CharacterHistoryId

  @column()
  declare characterId: CharacterId

  @column()
  declare historyTypeId: HistoryTypeId

  @column()
  declare payload: object

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateId(characterHistory: CharacterHistory) {
    characterHistory.id = randomUUID() as CharacterHistoryId
  }

  @hasOne(() => HistoryType)
  declare historyType: HasOne<typeof HistoryType>

  @hasOne(() => Character)
  declare character: HasOne<typeof Character>
}
