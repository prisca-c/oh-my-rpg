import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'item_categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().unique()
      table.integer('inventory_space_height').notNullable()
      table.integer('inventory_space_width').notNullable()
      table.boolean('is_stackable').defaultTo(false)
      table.boolean('is_equippable').defaultTo(false)
      table.boolean('is_usable').defaultTo(false)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    const categories = [
      {
        name: 'weapon',
        inventory_space_height: 2,
        inventory_space_width: 1,
        is_equippable: true,
      },
      {
        name: 'armor',
        inventory_space_height: 2,
        inventory_space_width: 2,
        is_equippable: true,
      },
      {
        name: 'accessory',
        inventory_space_height: 1,
        inventory_space_width: 1,
        is_equippable: true,
      },
      {
        name: 'clothing',
        inventory_space_height: 2,
        inventory_space_width: 2,
        is_equippable: true,
      },
      {
        name: 'consumable',
        inventory_space_height: 1,
        inventory_space_width: 1,
        is_stackable: true,
        is_usable: true,
      },
      {
        name: 'material',
        inventory_space_height: 1,
        inventory_space_width: 1,
        is_stackable: true,
      },
      {
        name: 'key',
        inventory_space_height: 1,
        inventory_space_width: 1,
      },
      {
        name: 'miscellaneous',
        inventory_space_height: 1,
        inventory_space_width: 1,
      },
    ]

    this.defer(async () => {
      await this.db.table('item_categories').insert(
        categories.map((category) => ({
          ...category,
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
