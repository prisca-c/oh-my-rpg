import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'limits'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('description').nullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at').nullable()
    })

    const limits = [
      {
        name: 'none',
        description: 'No limit',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'user',
        description: 'The user limit',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'daily',
        description: 'The daily limit',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'weekly',
        description: 'The weekly limit',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'monthly',
        description: 'The monthly limit',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'yearly',
        description: 'The yearly limit',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    this.defer(async (db) => {
      db.table('limits').insert(limits)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
