import type Item from '#models/item'
import type World from '#models/world'
import type ItemList from '#models/item_list'

export default class GetItems {
  async handle(world: World): Promise<Item[]> {
    await world.load('itemLists', (itemListsQuery) => {
      itemListsQuery.preload('items')
    })

    const lists: Item[] = []

    world.itemLists.map((itemList: ItemList) => {
      itemList.items.map((item) => {
        lists.push(item)
      })
    })

    return lists
  }
}
