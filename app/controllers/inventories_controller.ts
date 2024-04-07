import type { HttpContext } from '@adonisjs/core/http'

import { assert } from '#utils/assert'
import Character from '#models/character'
import { InventoryDTO } from '#dto/inventory_dto'
import { CanItemBePlaced } from '#features/inventory/can_item_be_placed'

export default class InventoriesController {
  async update({ params, request, response }: HttpContext) {
    const { characterId, itemId } = params
    const { page, position } = request.all()

    if (!page || !position) {
      return response.status(400).send({ message: 'Missing required parameters' })
    }

    const character = await Character.findOrFail(characterId)
    const item = await character.related('inventory').query().where('id', itemId).firstOrFail()

    if (!item) {
      return response.notFound({ message: 'Item not found' })
    }

    assert(item.position)
    assert(item.page)
    const itemsOnPage = await character.related('inventory').query().where('page', page)
    const normalizedItemsOnPage = []
    for (const item of itemsOnPage) {
      const size = await item.size()
      const position = item.position
      normalizedItemsOnPage.push({ position, size })
    }
    const canPlaceItem = await new CanItemBePlaced().handle(
      normalizedItemsOnPage,
      await item.size(),
      position.x,
      position.y,
    )

    if (!canPlaceItem) {
      return response.status(400).send({ message: 'Item cannot be placed' })
    }

    item.position = position
    item.page = page
    await item.save()

    const newInventory = await InventoryDTO.fromCharacter(character.id)

    response.send(newInventory.toJSON())
  }
}
