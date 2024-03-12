import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

import Item from '#models/item'
import World from '#models/world'
import ItemBase from '#models/item_base'
import ItemList from '#models/item_list'
import ItemRarity from '#models/item_rarity'
import ItemCategory from '#models/item_category'
import ItemItemList from '#models/item_item_list'
import type { ItemListId } from '#models/item_list'
import EntityProperty from '#models/entity_property'
import type { ItemItemListId } from '#models/item_item_list'
import type { EntityPropertyId } from '#models/entity_property'
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
        id: randomUUID() as EntityPropertyId,
      })
      Object.assign(item, { id: randomUUID(), entityPropertyId: entityProperty.id })
    }

    const itemBase = await ItemBase.createMany(itemBaseList)

    const itemRarity = await ItemRarity.findBy('name', ItemRarityEnum.COMMON)
    const itemRarityId = itemRarity!.id
    const itemsArray: Partial<Item>[] = [
      {
        name: 'Axe of the First Age',
        description: 'An axe forged in the first age of the world',
        level: 1,
        isActive: true,
        isTradeable: true,
        itemBaseId: itemBase[0].id,
        itemRarityId,
      },
      {
        name: 'Sword of the First Age',
        description: 'A sword forged in the first age of the world',
        level: 1,
        isActive: true,
        isTradeable: true,
        itemBaseId: itemBase[1].id,
        itemRarityId,
      },
      {
        name: 'Mace of the First Age',
        description: 'A mace forged in the first age of the world',
        level: 1,
        isActive: true,
        isTradeable: true,
        itemBaseId: itemBase[2].id,
        itemRarityId,
      },
      {
        name: 'Bow of the First Age',
        description: 'A bow forged in the first age of the world',
        level: 1,
        isActive: true,
        isTradeable: true,
        itemBaseId: itemBase[3].id,
        itemRarityId,
      },
      {
        name: 'Crossbow of the First Age',
        description: 'A crossbow forged in the first age of the world',
        level: 1,
        isActive: true,
        isTradeable: true,
        itemBaseId: itemBase[4].id,
        itemRarityId,
      },
    ]

    itemsArray.forEach((item) => {
      Object.assign(item, { id: randomUUID() })
    })

    const items = await Item.createMany(itemsArray)
    await ItemList.create({
      id: randomUUID() as ItemListId,
      name: 'First Age Items',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    }).then(async (itemList) => {
      for (const item of items) {
        await ItemItemList.create({
          id: randomUUID() as ItemItemListId,
          itemId: item.id,
          itemListId: itemList.id,
          dropChance: 0.1,
          onlyBoss: false,
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
        })
      }

      const world = await World.findBy('name', 'Oh no! Goblins!')
      await world!.linkToItemList(itemList)
    })
  }
}
