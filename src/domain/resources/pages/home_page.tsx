import { route } from '#infrastructure/helpers/route'

export const HomePage = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <a href={route('login.get')}>Login</a>
    </div>
  )
}
