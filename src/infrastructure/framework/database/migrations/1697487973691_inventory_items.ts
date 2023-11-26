import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'inventory_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').defaultTo(this.raw('gen_random_uuid()')).primary()
      table.uuid('character_id').references('id').inTable('characters').onDelete('CASCADE')
      table.uuid('item_id').references('id').inTable('items').onDelete('CASCADE')
      table.integer('quantity').notNullable()
      table.boolean('has_suffix').defaultTo(false)
      table.uuid('item_suffix_id').references('id').inTable('item_suffixes').onDelete('CASCADE')
      table.boolean('is_equipped').defaultTo(false)
      table.jsonb('position').notNullable()
      table.integer('page').notNullable()

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
