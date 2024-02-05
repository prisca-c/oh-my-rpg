import { getErrorByField } from '#infrastructure/helpers/session'
import { route } from '#infrastructure/helpers/route'
import { HttpContext } from '@adonisjs/core/http'
export const Register = ({ ctx }: { ctx: HttpContext }) => {
  const submit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    fetch(route('register.post'), {
      method: 'POST',
      body: formData,
    })
  }

  return (
    <div>
      <h1>Register</h1>
      <form method="POST" onsubmit={submit}>
        <input type="hidden" name="_csrf" value={ctx.request.csrfToken} />
        <div>
          {getErrorByField(ctx, 'username') && <p>{getErrorByField(ctx, 'username')}</p>}
          <label for="username">Username</label>
          <input type="text" name="username" id="username" />
        </div>
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
          {getErrorByField('password_confirmation') && (
            <p>{getErrorByField('password_confirmation')}</p>
          )}
          <label for="password_confirmation">Confirm Password</label>
          <input type="password" name="password_confirmation" id="password_confirmation" />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  )
}
