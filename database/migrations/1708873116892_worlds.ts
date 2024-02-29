import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'worlds'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').defaultTo(this.raw('gen_random_uuid()')).primary()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table
        .integer('difficulty_id')
        .references('id')
        .inTable('difficulties')
        .onDelete('CASCADE')
        .notNullable()
      table.boolean('is_active').defaultTo(false)
      table.jsonb('requirements').notNullable()
      table.integer('max_drop').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.defer(async (db) => {
      const difficulty = await db.from('difficulties').where('name', 'tutorial').first()
      await db.table('worlds').insert([
        {
          name: 'Oh no! Goblins!',
          description: 'A world filled with goblins!',
          is_event: false,
          is_active: true,
          requirements: {
            level: 1,
          },
          max_drop: 1,
          difficulty_id: difficulty.id,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
