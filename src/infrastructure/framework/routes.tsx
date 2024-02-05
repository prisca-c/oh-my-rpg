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
import { Home } from '../../domain/resources/home'
import { Login } from '../../domain/resources/login'

const GamesController = () => import('#controllers/games_controller')
const CharactersController = () => import('#controllers/characters_controller')
const AuthController = () => import('#controllers/auth_controller')

router.get('/', async () => {
  return <Home />
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

router.get('/login', () => <Login />).as('login.get')
router.post('/login', [AuthController, 'login']).as('login.post')

router.get('/logout', [AuthController, 'logout'])

router.post('/register', [AuthController, 'register']).as('register')

router.get('/auth0/callback', [AuthController, 'auth0Callback'])
