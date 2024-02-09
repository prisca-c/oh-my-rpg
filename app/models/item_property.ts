import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'

export default class ItemProperty extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare entityId: string

  @column()
  declare entityType: string

  @column()
  declare propertyType: string

  @column()
  declare calculationType: string

  @column()
  declare value: number

  @column()
  declare duration: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateId(itemProperty: ItemProperty) {
    itemProperty.id = randomUUID()
  }
}
