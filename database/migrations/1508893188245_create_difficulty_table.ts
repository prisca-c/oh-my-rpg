import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'difficulties'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('description').nullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    const difficulties = [
      {
        name: 'tutorial',
        description: 'The tutorial difficulty',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'easy',
        description: 'The easy difficulty',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'normal',
        description: 'The normal difficulty',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'hard',
        description: 'The hard difficulty',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'expert',
        description: 'The expert difficulty',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'hardcore',
        description: 'The hardcore difficulty',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'nightmare',
        description: 'The nightmare difficulty',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'legendary',
        description: 'The legendary difficulty',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'divine',
        description: 'The divine difficulty',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'infernal',
        description: 'The infernal difficulty',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'apocalypse',
        description: 'The apocalypse difficulty',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    this.defer(async (db) => {
      await db.table('difficulties').insert(difficulties)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
