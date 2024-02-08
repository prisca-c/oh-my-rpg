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

const RegisterController = () => import('#controllers/register_controller')

const LoginController = () => import('#controllers/login_controller')

const HomeController = () => import('#controllers/home_controller')

const GamesController = () => import('#controllers/games_controller')
const CharactersController = () => import('#controllers/characters_controller')
const AuthController = () => import('#controllers/auth_controller')

router.get('/', [HomeController, 'index'])

router.get('/login', [LoginController, 'index']).as('login.get')
router.post('/login', [AuthController, 'login']).as('login.post')

router.get('/logout', [AuthController, 'logout'])

router.get('/register', [RegisterController, 'index']).as('register.get')
router.post('/register', [AuthController, 'register']).as('register.post')

router
  .group(() => {
    router.get('/game/:id', [GamesController, 'index']).where('id', router.matchers.uuid())
    router.get('/character', [CharactersController, 'index'])
    router.get('/user/characters', [CharactersController, 'index'])
    router.post('/character', [CharactersController, 'store']).as('character.store')
  })
  .use(middleware.auth())
