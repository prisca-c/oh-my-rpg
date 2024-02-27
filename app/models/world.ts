import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { HasManyThrough, HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, column, hasManyThrough, hasOne } from '@adonisjs/lucid/orm'

import Item from '#models/item'
import Event from '#models/event'
import ItemList from '#models/item_list'
import Difficulty from '#models/difficulty'
import ItemItemList from '#models/item_item_list'

export default class World extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare isEvent: boolean

  @column()
  declare eventID: string

  @column()
  declare isActive: boolean

  @column()
  declare requirement: object

  @column()
  declare maxDrop: number

  @column()
  declare itemListId: string

  @column()
  declare difficultyId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateId(world: World) {
    world.id = randomUUID()
  }

  @hasOne(() => Difficulty)
  declare difficulty: HasOne<typeof Difficulty>

  @hasOne(() => Event)
  declare event: HasOne<typeof Event>

  @hasOne(() => ItemList)
  declare itemList: HasOne<typeof ItemList>

  @hasManyThrough([() => Item, () => ItemItemList])
  declare items: HasManyThrough<typeof Item>
}
