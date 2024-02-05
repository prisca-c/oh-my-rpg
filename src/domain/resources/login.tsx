import { route } from '#infrastructure/helpers/route'
import { getErrorByField } from '#infrastructure/helpers/session'
import type { HttpContext } from '@adonisjs/core/http'

export const Login = ({ ctx }: { ctx: HttpContext }) => {
  console.log(route('login.post'))

  const submit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    console.log(route('login.post'))
    fetch(route('login.post'), {
      method: 'POST',
      body: formData,
    })
  }
  return (
    <div>
      <h1>Login</h1>
      <form method="POST" onsubmit={submit}>
        <input type="hidden" name="_csrf" value={ctx.request.csrfToken} />
        <div>
          {getErrorByField(ctx, 'email') && <p>{getErrorByField(ctx, 'email')}</p>}
          <label for="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          {getErrorByField(ctx, 'password') && <p>{getErrorByField(ctx, 'password')}</p>}
          <label for="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}
