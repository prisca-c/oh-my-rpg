import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'item_bases'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').defaultTo(this.raw('gen_random_uuid()')).primary()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.string('image').nullable()
      table
        .integer('item_category_id')
        .references('id')
        .inTable('item_categories')
        .onDelete('CASCADE')
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
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
