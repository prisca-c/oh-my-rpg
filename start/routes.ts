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
const hmr = import.meta.hot?.boundary
const LootController = () => import('#controllers/loot_controller', hmr)
const RegisterController = () => import('#controllers/register_controller', hmr)
const LoginController = () => import('#controllers/login_controller', hmr)
const HomeController = () => import('#controllers/home_controller', hmr)
const GamesController = () => import('#controllers/games_controller', hmr)
const CharactersController = () => import('#controllers/characters_controller', hmr)
const AuthController = () => import('#controllers/auth_controller', hmr)
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
