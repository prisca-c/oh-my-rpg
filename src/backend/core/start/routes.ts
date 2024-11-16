/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import { middleware } from '#core/start/kernel'

// region -- Import controllers
const LootController = () => import('#infrastructure/http/controllers/loot_controller')
const RegisterController = () => import('#infrastructure/http/controllers/register_controller')
const LoginController = () => import('#infrastructure/http/controllers/login_controller')
const HomeController = () => import('#infrastructure/http/controllers/home_controller')
const GamesController = () => import('#infrastructure/http/controllers/games_controller')
const CharactersController = () => import('#infrastructure/http/controllers/characters_controller')
const AuthController = () => import('#infrastructure/http/controllers/auth_controller')
const InventoriesController = () =>
  import('#infrastructure/http/controllers/inventories_controller')
// endregion

router.get('/', [HomeController, 'index'])

router.get('/login', [LoginController, 'index']).as('login.get')
router.post('/login', [AuthController, 'login']).as('login.post')

router.get('/logout', [AuthController, 'logout'])

router.get('/register', [RegisterController, 'index']).as('register.get')
router.post('/register', [AuthController, 'register']).as('register.post')
router
  .group(() => {
    router
      .get('/game/:id', [GamesController, 'index'])
      .where('id', router.matchers.uuid())
      .as('game')
    router.get('/characters', [CharactersController, 'index'])
    router.post('/characters', [CharactersController, 'store']).as('character.store')
    router.get('/world/loot/:id', [LootController, 'handle']).where('id', router.matchers.uuid())
    router
      .put('/inventory/:characterId/item/:itemId', [InventoriesController, 'update'])
      .where('characterId', router.matchers.uuid())
      .where('itemId', router.matchers.uuid())
  })
  .use(middleware.auth())
