import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'history_types'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    const types = [
      'level',
      'world',
      'fight',
      'duel',
      'secrets_items',
      'money',
      'death',
      'quest',
      'achievement',
    ]

    this.defer(async () => {
      await this.db.table('history_types').insert(
        types.map((name) => ({
          name: name,
          created_at: new Date(),
          updated_at: new Date(),
        }))
      )
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
