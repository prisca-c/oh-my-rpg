import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'entities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').defaultTo(this.raw('gen_random_uuid()')).primary()
      table.string('name').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    const entities = [
      {
        name: 'character',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'enemy',
        updated_at: new Date(),
        created_at: new Date(),
      },
      {
        name: 'npc',
        updated_at: new Date(),
        created_at: new Date(),
      },
    ]

    this.defer(async (db) => {
      await db.table('entities').insert(entities)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
