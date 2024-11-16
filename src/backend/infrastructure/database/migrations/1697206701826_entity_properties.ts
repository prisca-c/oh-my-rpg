import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'entity_properties'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').defaultTo(this.raw('gen_random_uuid()')).primary()
      table.string('entity_type').notNullable()
      table.uuid('entity_id').references('id').inTable('entities').onDelete('CASCADE')
      table.integer('constitution').notNullable().defaultTo(0)
      table.integer('strength').notNullable().defaultTo(0)
      table.integer('dexterity').notNullable().defaultTo(0)
      table.integer('intelligence').notNullable().defaultTo(0)
      table.integer('wisdom').notNullable().defaultTo(0)
      table.integer('charisma').notNullable().defaultTo(0)
      table.integer('luck').notNullable().defaultTo(0)
      table.integer('perception').notNullable().defaultTo(0)

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
