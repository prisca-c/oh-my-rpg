import type { HttpContext } from '@adonisjs/core/http'

import { assert } from '#utils/assert'
import Character from '#models/character'
import { InventoryDTO } from '#dto/inventory_dto'
import { CanItemBePlaced } from '#features/inventory/can_item_be_placed'

export default class InventoriesController {
  async update({ params, request, response, session }: HttpContext) {
    const { characterId, itemId } = params
    const { page, position, id } = request.all()

    if (!page || !position) {
      session.flash('error', 'Invalid request')
      return response.redirect().toRoute('game', { id: characterId })
    }

    const character = await Character.findOrFail(characterId)
    const item = await character.related('inventory').query().where('id', itemId).firstOrFail()

    if (!item) {
      session.flash('error', 'Item not found')
      return response.redirect().toRoute('game', { id: characterId })
    }

    assert(item.position)
    assert(item.page)
    const itemsOnPage = await character.related('inventory').query().where('page', page)
    const normalizedItemsOnPage = []
    for (const item of itemsOnPage) {
      const id = item.id
      const size = await item.size()
      const position = item.position
      normalizedItemsOnPage.push({ id, position, size })
    }
    const canPlaceItem = await new CanItemBePlaced().handle(normalizedItemsOnPage, {
      id,
      size: await item.size(),
      position,
    })

    if (!canPlaceItem) {
      session.flash('error', 'Item cannot be placed here')
      return response.redirect().toRoute('game', { id: characterId })
    }

    item.position = position
    item.page = page
    await item.save()

    const newInventory = await InventoryDTO.fromCharacter(character.id)

    return response.ok(newInventory.toJSON())
  }
}
