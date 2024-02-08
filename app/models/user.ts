import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import hash from '@adonisjs/core/services/hash'
import { withAuthFinder } from '@adonisjs/auth'
import { compose } from '@adonisjs/core/helpers'
import { HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'

import Character from '#models/character'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
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

  @beforeCreate()
  static async generateId(user: User) {
    user.id = randomUUID()
  }

  @hasMany(() => Character)
  declare characters: HasMany<typeof Character>
}
