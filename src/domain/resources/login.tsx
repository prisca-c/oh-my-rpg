import { csrfField } from '#infrastructure/helpers/csrf'
import { route } from '#infrastructure/helpers/route'
export const Login = () => {
  console.log(route('login.post'))

  const submit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    console.log(route('login.post'))
    fetch(route('login.post'), {
      method: 'POST',
      body: formData,
      headers: {
        'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)
          .content,
      },
    })
  }
  return (
    <div>
      <h1>Login</h1>
      <form method="POST" onsubmit={submit}>
        {csrfField()}
        <div>
          <label for="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
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
