import type { HttpContext } from '@adonisjs/core/http'

import { assert } from '#common/utils/assert'
import Character from '#infrastructure/models/character'
import { InventoryDTO } from '#application/dto/inventory_dto'
import { CanItemBePlaced } from '#domain/inventory/can_item_be_placed'

export default class UpdateInventoryItemPositionController {
  async handle({ params, request, response, session }: HttpContext) {
    const { characterId, itemId } = params
    const { page, position, id } = request.all()

    if (!page || !position) {
      session.flash('error', 'Invalid request')
      return response.redirect().toPath(`/game/${characterId}`)
    }

    const character = await Character.findOrFail(characterId)
    const item = await character.related('inventory').query().where('id', itemId).firstOrFail()

    if (!item) {
      session.flash('error', 'Item not found')
      return response.redirect().toPath(`/game/${characterId}`)
    }

    assert(item.position)
    assert(item.page)
    const itemsOnPage = await character.related('inventory').query().where('page', page)
    const normalizedItemsOnPage = []
    for (const inventoryItem of itemsOnPage) {
      const inventoryItemId = inventoryItem.id
      const size = await inventoryItem.size()
      const inventoryItemPosition = inventoryItem.position
      normalizedItemsOnPage.push({ id: inventoryItemId, position: inventoryItemPosition, size })
    }
    const canPlaceItem = await new CanItemBePlaced().handle(normalizedItemsOnPage, {
      id,
      size: await item.size(),
      position,
    })

    if (!canPlaceItem) {
      session.flash('error', 'Item cannot be placed here')
      return response.redirect().toPath(`/game/${characterId}`)
    }

    item.position = position
    item.page = page
    await item.save()

    const newInventory = await InventoryDTO.fromCharacter(character.id)

    return response.ok(newInventory.toJSON())
  }
}
