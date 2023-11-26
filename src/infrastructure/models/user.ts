import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, beforeCreate, beforeSave, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Character from '#models/character'
import { randomUUID } from 'node:crypto'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare username: string

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare rememberMeToken?: string

  @column()
  declare lastSessionId?: string

  @column()
  declare lastLoginAt?: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  async verifyPasswordForAuth(plainTextPassword: string) {
    return hash.verify(this.password, plainTextPassword)
  }

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }

  @beforeCreate()
  static async generateId(user: User) {
    user.id = randomUUID()
  }

  @hasMany(() => Character)
  declare characters: HasMany<typeof Character>
}
