import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import type { Opaque } from '@poppinss/utils/types'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'

import Character from '#models/character'

export type UserId = Opaque<'userId', string>

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder, SoftDeletes) {
  @column({ isPrimary: true })
  declare id: UserId

  @column()
  declare username: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column({ serializeAs: null })
  declare rememberMeToken?: string

  @column({ serializeAs: null })
  declare lastSessionId?: string

  @column({ serializeAs: null })
  declare lastLoginAt?: DateTime

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

  @beforeCreate()
  static async generateId(user: User) {
    user.id = randomUUID() as UserId
  }

  @hasMany(() => Character)
  declare characters: HasMany<typeof Character>
}
