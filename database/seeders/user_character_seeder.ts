import { BaseSeeder } from '@adonisjs/lucid/seeders'

import User from '#models/user'
import Character from '#models/character'

export default class extends BaseSeeder {
  async run() {
    const user = new User()
    user.username = 'test'
    user.email = 'test@test.com'
    user.password = 'Test123*'
    await user.save()

    const character = new Character()
    character.name = 'test'
    character.userId = user.id
    await character.save()
  }
}
