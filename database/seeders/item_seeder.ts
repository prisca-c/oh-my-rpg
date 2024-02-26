import { randomUUID } from 'node:crypto'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

import Item from '#models/item'
import ItemBase from '#models/item_base'
import ItemRarity from '#models/item_rarity'
import ItemCategory from '#models/item_category'
import EntityProperty from '#models/entity_property'
import { ItemRarity as ItemRarityEnum } from '#enums/item_rarity.enum'

export default class extends BaseSeeder {
  async run() {
    const itemCategory = await ItemCategory.findBy('name', 'weapon')
    const entityPropertyBase = {
      entityType: 'item',
      constitution: 0,
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
      luck: 0,
      perception: 0,
    }

    const itemBaseList: Partial<ItemBase>[] = [
      { name: 'Sword', itemCategoryId: itemCategory!.id, description: 'A sword' },
      { name: 'Axe', itemCategoryId: itemCategory!.id, description: 'An axe' },
      { name: 'Mace', itemCategoryId: itemCategory!.id, description: 'A mace' },
      { name: 'Bow', itemCategoryId: itemCategory!.id, description: 'A bow' },
      { name: 'Crossbow', itemCategoryId: itemCategory!.id, description: 'A crossbow' },
      { name: 'Dagger', itemCategoryId: itemCategory!.id, description: 'A dagger' },
      { name: 'Spear', itemCategoryId: itemCategory!.id, description: 'A spear' },
      { name: 'Staff', itemCategoryId: itemCategory!.id, description: 'A staff' },
      { name: 'Wand', itemCategoryId: itemCategory!.id, description: 'A wand' },
      { name: 'Shield', itemCategoryId: itemCategory!.id, description: 'A shield' },
    ]

    for (const item of itemBaseList) {
      const entityProperty = await EntityProperty.create({
        ...entityPropertyBase,
        id: randomUUID(),
      })
      Object.assign(item, { id: randomUUID(), entityPropertyId: entityProperty.id })
    }

    const itemBase = await ItemBase.createMany(itemBaseList)

    const itemRarity = await ItemRarity.findBy('name', ItemRarityEnum.COMMON)
    const itemRarityId = itemRarity!.id
    const itemList = [
      {
        name: 'Axe of the First Age',
        description: 'An axe forged in the first age of the world',
        level: 1,
        is_active: true,
        is_tradeable: true,
        itemBaseId: itemBase[0].id,
        itemRarityId,
      },
      {
        name: 'Sword of the First Age',
        description: 'A sword forged in the first age of the world',
        level: 1,
        is_active: true,
        is_tradeable: true,
        itemBaseId: itemBase[1].id,
        itemRarityId,
      },
      {
        name: 'Mace of the First Age',
        description: 'A mace forged in the first age of the world',
        level: 1,
        is_active: true,
        is_tradeable: true,
        itemBaseId: itemBase[2].id,
        itemRarityId,
      },
      {
        name: 'Bow of the First Age',
        description: 'A bow forged in the first age of the world',
        level: 1,
        is_active: true,
        is_tradeable: true,
        itemBaseId: itemBase[3].id,
        itemRarityId,
      },
      {
        name: 'Crossbow of the First Age',
        description: 'A crossbow forged in the first age of the world',
        level: 1,
        is_active: true,
        is_tradeable: true,
        itemBaseId: itemBase[4].id,
        itemRarityId,
      },
    ]

    itemList.forEach((item) => {
      Object.assign(item, { id: randomUUID() })
    })

    await Item.createMany(itemList)
  }
}
