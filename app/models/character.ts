import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { Opaque } from '@poppinss/utils/types'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, column, hasMany, hasOne } from '@adonisjs/lucid/orm'

import User, { type UserId } from '#models/user'
import InventoryItem from '#models/inventory_item'
import EntityProperty, { type EntityPropertyId } from '#models/entity_property'

export type CharacterId = Opaque<'characterId', string>

export default class Character extends BaseModel {
  @column({ isPrimary: true })
  declare id: CharacterId

  @column()
  declare userId: UserId

  @column()
  declare name: string

  @column()
  declare entityPropertyId: EntityPropertyId

  @column()
  declare inventorySize: number

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

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
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
    character.id = randomUUID() as CharacterId
  }

  @hasOne(() => User)
  declare user: HasOne<typeof User>

  @hasOne(() => EntityProperty, {
    localKey: 'entityPropertyId',
    foreignKey: 'id',
  })
  declare entityProperties: HasOne<typeof EntityProperty>

  @hasMany(() => InventoryItem)
  declare inventory: HasMany<typeof InventoryItem>
}
