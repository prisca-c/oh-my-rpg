import Character from '#models/character'
import { HttpContext } from '@adonisjs/core/http'

export default class GamesController {
  async index({ params, auth, session }: HttpContext) {
    const user = auth.user
    const id = params.id

    const character = await Character.find(id)

    if (user?.id !== character?.userId || !character) {
      session.flash('error', 'Seems like there was an error loading your character.')
      //return view.render('game')
    }

    const characters = Character.query()
      .select('id', 'name', 'level')
      .orderBy('level', 'desc')
      .limit(5)

    // return view.render('game', {
    //   character: character,
    //   leaderboard: await characters,
    //   properties: await character.entityProperty,
    // })
  }
}
