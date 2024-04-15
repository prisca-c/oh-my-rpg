import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'characters'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').defaultTo(this.raw('gen_random_uuid()')).primary()
      table.string('name').notNullable()
      table.integer('currency').notNullable().defaultTo(0)
      table.integer('level').notNullable().defaultTo(1)
      table.integer('inventory_size').notNullable().defaultTo(10)
      table.integer('experience').notNullable().defaultTo(0)
      table.integer('total_experience').notNullable().defaultTo(0)
      table.dateTime('lucky_charm').nullable()
      table.integer('deaths').notNullable().defaultTo(0)
      table.integer('enemies_killed').notNullable().defaultTo(0)
      table.integer('bosses_killed').notNullable().defaultTo(0)
      table.integer('duels_won').notNullable().defaultTo(0)
      table.integer('total_duels').notNullable().defaultTo(0)
      table.integer('secrets_items_found').notNullable().defaultTo(0)
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
      table
        .uuid('entity_property_id')
        .references('id')
        .inTable('entity_properties')
        .onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
