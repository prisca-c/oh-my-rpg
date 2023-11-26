import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'worlds'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').defaultTo(this.raw('gen_random_uuid()')).primary()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.boolean('is_event').defaultTo(false)
      table.uuid('event_id').references('id').inTable('events').onDelete('CASCADE')
      table.boolean('is_active').defaultTo(false)
      table.jsonb('requirements').notNullable()
      table.integer('max_drop').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
