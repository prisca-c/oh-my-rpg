import { HttpContext } from '@adonisjs/core/http'

export function csrfField() {
  const { request } = HttpContext.getOrFail()

  return Html.createElement('input', { type: 'hidden', value: request.csrfToken, name: '_csrf' })
}
