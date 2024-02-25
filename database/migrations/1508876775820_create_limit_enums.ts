import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.raw("CREATE TYPE limit_enum AS ENUM ('none', 'user', 'daily', 'weekly', 'monthly')")
  }

  async down() {
    this.schema.raw('DROP TYPE IF EXISTS limit_enum')
  }
}
