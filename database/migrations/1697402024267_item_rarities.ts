import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'item_rarities'

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

    const rarities = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic', 'secret']

    this.defer(async () => {
      await this.db.table('item_rarities').insert(
        rarities.map((name) => ({
          name,
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
