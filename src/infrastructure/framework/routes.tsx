/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import { HomePage } from '#domain/resources/pages/home_page'
import { LoginPage } from '#domain/resources/pages/login_page'
import { RegisterPage } from '#domain/resources/pages/register_page'
import { HttpContext } from '@adonisjs/core/http'

const GamesController = () => import('#controllers/games_controller')
const CharactersController = () => import('#controllers/characters_controller')
const AuthController = () => import('#controllers/auth_controller')

router.get('/', async () => {
  return <HomePage />
})

router.get('/login', (ctx: HttpContext) => <LoginPage ctx={ctx} />).as('login.get')
router.post('/login', [AuthController, 'login']).as('login.post')

router.get('/logout', [AuthController, 'logout'])

router
  .get('/register', (ctx: HttpContext) => ctx.jsx(<RegisterPage ctx={ctx} />))
  .as('register.get')
router.post('/register', [AuthController, 'register']).as('register.post')

router
  .group(() => {
    router.get('/game/:id', [GamesController, 'index']).where('id', router.matchers.uuid())
    router.get('/character', [CharactersController, 'index'])
    router.get('/user/characters', [CharactersController, 'index'])
    router.post('/character', [CharactersController, 'store']).as('character.store')
  })
  .use(middleware.auth())
