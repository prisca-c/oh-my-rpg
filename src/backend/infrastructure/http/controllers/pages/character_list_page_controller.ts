import type { HttpContext } from '@adonisjs/core/http'

export default class CharacterListPageController {
  async handle({ auth, inertia }: HttpContext) {
    const user = auth.user
    await user?.load('characters')

    return inertia.render(
      'private/character_list_page',
      { characters: user?.characters ?? [] },
      {
        meta: {
          title: 'Characters',
          description: 'List of your characters',
        },
      }
    )
  }
}
