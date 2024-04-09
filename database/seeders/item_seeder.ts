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
    const itemCategoryWeapon = await ItemCategory.findBy('name', 'weapon')
    const itemCategoryArmor = await ItemCategory.findBy('name', 'armor')
    const itemCategoryConsumable = await ItemCategory.findBy('name', 'consumable')
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
      { name: 'Sword', itemCategoryId: itemCategoryWeapon!.id, description: 'A sword' },
      { name: 'Axe', itemCategoryId: itemCategoryWeapon!.id, description: 'An axe' },
      { name: 'Mace', itemCategoryId: itemCategoryWeapon!.id, description: 'A mace' },
      { name: 'Bow', itemCategoryId: itemCategoryWeapon!.id, description: 'A bow' },
      { name: 'Crossbow', itemCategoryId: itemCategoryWeapon!.id, description: 'A crossbow' },
      { name: 'Dagger', itemCategoryId: itemCategoryWeapon!.id, description: 'A dagger' },
      { name: 'Spear', itemCategoryId: itemCategoryWeapon!.id, description: 'A spear' },
      { name: 'Staff', itemCategoryId: itemCategoryWeapon!.id, description: 'A staff' },
      { name: 'Wand', itemCategoryId: itemCategoryWeapon!.id, description: 'A wand' },
      { name: 'Shield', itemCategoryId: itemCategoryWeapon!.id, description: 'A shield' },
      { name: 'Helmet', itemCategoryId: itemCategoryArmor!.id, description: 'A helmet' },
      { name: 'Chestplate', itemCategoryId: itemCategoryArmor!.id, description: 'A chestplate' },
      {
        name: 'Leggings',
        itemCategoryId: itemCategoryArmor!.id,
        description: 'A pair of leggings',
      },
      { name: 'Boots', itemCategoryId: itemCategoryArmor!.id, description: 'A pair of boots' },
      { name: 'Gloves', itemCategoryId: itemCategoryArmor!.id, description: 'A pair of gloves' },
      { name: 'Potion', itemCategoryId: itemCategoryConsumable!.id, description: 'A potion' },
      { name: 'Scroll', itemCategoryId: itemCategoryConsumable!.id, description: 'A scroll' },
      { name: 'Food', itemCategoryId: itemCategoryConsumable!.id, description: 'Some food' },
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
      {
        name: 'Dagger of the First Age',
        description: 'A dagger forged in the first age of the world',
        level: 1,
        isActive: true,
        isTradeable: true,
        itemBaseId: itemBase[5].id,
        itemRarityId,
      },
      {
        name: 'Spear of the First Age',
        description: 'A spear forged in the first age of the world',
        level: 1,
        isActive: true,
        isTradeable: true,
        itemBaseId: itemBase[6].id,
        itemRarityId,
      },
      {
        name: 'Staff of the First Age',
        description: 'A staff forged in the first age of the world',
        level: 1,
        isActive: true,
        isTradeable: true,
        itemBaseId: itemBase[7].id,
        itemRarityId,
      },
      {
        name: 'Wand of the First Age',
        description: 'A wand forged in the first age of the world',
        level: 1,
        isActive: true,
        isTradeable: true,
        itemBaseId: itemBase[8].id,
        itemRarityId,
      },
      {
        name: 'Shield of the First Age',
        description: 'A shield forged in the first age of the world',
        level: 1,
        isActive: true,
        isTradeable: true,
        itemBaseId: itemBase[9].id,
        itemRarityId,
      },
      {
        name: 'Helmet of the First Age',
        description: 'A helmet forged in the first age of the world',
        level: 1,
        isActive: true,
        isTradeable: true,
        itemBaseId: itemBase[10].id,
        itemRarityId,
      },
      {
        name: 'Chestplate of the First Age',
        description: 'A chestplate forged in the first age of the world',
        level: 1,
        isActive: true,
        isTradeable: true,
        itemBaseId: itemBase[11].id,
        itemRarityId,
      },
      {
        name: 'Leggings of the First Age',
        description: 'A pair of leggings forged in the first age of the world',
        level: 1,
        isActive: true,
        isTradeable: true,
        itemBaseId: itemBase[12].id,
        itemRarityId,
      },
      {
        name: 'Boots of the First Age',
        description: 'A pair of boots forged in the first age of the world',
        level: 1,
        isActive: true,
        isTradeable: true,
        itemBaseId: itemBase[13].id,
        itemRarityId,
      },
      {
        name: 'Gloves of the First Age',
        description: 'A pair of gloves forged in the first age of the world',
        level: 1,
        isActive: true,
        isTradeable: true,
        itemBaseId: itemBase[14].id,
        itemRarityId,
      },
      {
        name: 'Potion of the First Age',
        description: 'A potion brewed in the first age of the world',
        level: 1,
        isActive: true,
        isTradeable: true,
        itemBaseId: itemBase[15].id,
        itemRarityId,
      },
      {
        name: 'Scroll of the First Age',
        description: 'A scroll written in the first age of the world',
        level: 1,
        isActive: true,
        isTradeable: true,
        itemBaseId: itemBase[16].id,
        itemRarityId,
      },
      {
        name: 'Food of the First Age',
        description: 'Some food cooked in the first age of the world',
        level: 1,
        isActive: true,
        isTradeable: true,
        itemBaseId: itemBase[17].id,
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
