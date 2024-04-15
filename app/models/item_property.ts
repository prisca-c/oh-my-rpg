import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import { compose } from '@adonisjs/core/helpers'
import type { Opaque } from '@poppinss/utils/types'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'

import type { EntityId } from '#models/entity'

export type ItemPropertyId = Opaque<'itemPropertyId', string>

export default class ItemProperty extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  declare id: ItemPropertyId

  @column()
  declare entityId: EntityId

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

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

  @beforeCreate()
  static async generateId(itemProperty: ItemProperty) {
    itemProperty.id = randomUUID() as ItemPropertyId
  }
}
