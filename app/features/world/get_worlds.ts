import World from '#models/world'
import type Character from '#models/character'

export class GetWorlds {
  async handle(character: Character): Promise<World[]> {
    return World.query()
      .whereRaw("requirements->>'level' <= ?", [character.level])
      .orderByRaw("worlds.requirements->>'level'" + ' DESC')
      .preload('itemLists', (itemListsQuery) => {
        itemListsQuery.preload('items')
      })
  }
}
