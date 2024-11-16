import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'item_item_lists'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').defaultTo(this.raw('gen_random_uuid()')).primary()
      table.uuid('item_id').references('id').inTable('items').onDelete('CASCADE')
      table.uuid('item_list_id').references('id').inTable('item_lists').onDelete('CASCADE')
      table.float('drop_chance').nullable().defaultTo(null)
      table.boolean('only_boss').defaultTo(false)

      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
