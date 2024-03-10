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

// region -- Import controllers
const LootController = () => import('#controllers/loot_controller')
const RegisterController = () => import('#controllers/register_controller')
const LoginController = () => import('#controllers/login_controller')
const HomeController = () => import('#controllers/home_controller')
const GamesController = () => import('#controllers/games_controller')
const CharactersController = () => import('#controllers/characters_controller')
const AuthController = () => import('#controllers/auth_controller')
// endregion

router.get('/', [HomeController, 'index'])

router.get('/login', [LoginController, 'index']).as('login.get')
router.post('/login', [AuthController, 'login']).as('login.post')

router.get('/logout', [AuthController, 'logout'])

router.get('/register', [RegisterController, 'index']).as('register.get')
router.post('/register', [AuthController, 'register']).as('register.post')
router
  .group(() => {
    router.get('/game/:id', [GamesController, 'index']).where('id', router.matchers.uuid())
    router.get('/characters', [CharactersController, 'index'])
    router.post('/characters', [CharactersController, 'store']).as('character.store')
    router.get('/world/loot/:id', [LootController, 'handle']).where('id', router.matchers.uuid())
  })
  .use(middleware.auth())
