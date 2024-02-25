import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').defaultTo(this.raw('gen_random_uuid()')).primary()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.dateTime('start').notNullable()
      table.dateTime('end').notNullable()
      table
        .enum('limit_type', ['none', 'user', 'daily', 'weekly', 'monthly'], {
          useNative: true,
          existingType: true,
          enumName: 'limit_enum',
        })
        .notNullable()
        .defaultTo('none')
      table.integer('limit_amount').notNullable().defaultTo(0)

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
