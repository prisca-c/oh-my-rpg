import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').defaultTo(this.raw('gen_random_uuid()')).primary()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.string('image').nullable()
      table.integer('level').notNullable()
      table.boolean('is_active').defaultTo(true)
      table.boolean('is_tradeable').defaultTo(true)
      table.uuid('item_base_id').references('id').inTable('item_bases').onDelete('CASCADE')
      table.integer('item_rarity_id').references('id').inTable('item_rarities').onDelete('CASCADE')

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
