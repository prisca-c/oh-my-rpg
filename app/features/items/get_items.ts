import type Item from '#models/item'
import type World from '#models/world'
import type ItemList from '#models/item_list'

export default class GetItems {
  async handle(world: World): Promise<Item[]> {
    await world.load('itemLists', (itemListsQuery) => {
      itemListsQuery.preload('items', (itemsQuery) => {
        itemsQuery.preload('itemRarity')
      })
    })

    const items = world.itemLists.map((itemList: ItemList) => {
      return itemList.items
    })

    console.log('GetItems.handle', items)

    return items as unknown as Item[]
  }
}
