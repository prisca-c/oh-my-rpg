import type { HttpContext } from '@adonisjs/core/http'

export default class LandingPageController {
  async handle({ inertia }: HttpContext) {
    return inertia.render('public/landing_page')
  }
}
