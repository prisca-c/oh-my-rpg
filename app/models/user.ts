import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Character from '#models/character'
import { compose } from '@adonisjs/core/helpers'
import { randomUUID } from 'node:crypto'
import { withAuthFinder } from '@adonisjs/auth'
import { UsernameGenerate } from '../services/username_generate'

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

  @beforeCreate()
  static async generateUsername(user: User) {
    if (user.username === null || user.username === undefined || user.username === '') {
      user.username = new UsernameGenerate().generate()
    }
  }

  @hasMany(() => Character)
  declare characters: HasMany<typeof Character>
}
