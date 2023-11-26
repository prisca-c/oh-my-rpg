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
const GamesController = () => import('#controllers/games_controller')
const CharactersController = () => import('#controllers/characters_controller')
const AuthController = () => import('#controllers/auth_controller')

router.get('/', async () => 'It works!')

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

router.post('/login', [AuthController, 'login']).as('login')

router.get('/logout', [AuthController, 'logout'])

router.post('/register', [AuthController, 'register']).as('register')

router.get('/auth0/callback', [AuthController, 'auth0Callback'])
