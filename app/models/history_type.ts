import type { DateTime } from 'luxon'
import type { Opaque } from '@poppinss/utils/types'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export type HistoryTypeId = Opaque<'historyTypeId', number>

export default class HistoryType extends BaseModel {
  @column({ isPrimary: true })
  declare id: HistoryTypeId

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime
}
