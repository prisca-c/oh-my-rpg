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

router.get('/character', [CharactersController, 'index']).use(middleware.auth())

router.get('/user/characters', [CharactersController, 'index']).use(middleware.auth())

router
  .post('/character', [CharactersController, 'store'])
  .use(middleware.auth())
  .as('character.store')

router
  .get('/game/:id', [GamesController, 'index'])
  .where('id', router.matchers.uuid())
  .use(middleware.auth())

router.get('/login', (ctx: HttpContext) => <LoginPage ctx={ctx} />).as('login.get')
router.post('/login', [AuthController, 'login']).as('login.post')

router.get('/logout', [AuthController, 'logout'])

router.get('/register', (ctx: HttpContext) => <RegisterPage ctx={ctx} />).as('register.get')
router.post('/register', [AuthController, 'register']).as('register.post')

router.get('/auth0/callback', [AuthController, 'auth0Callback'])
