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

const RegisterPageController = () =>
  import('#infrastructure/http/controllers/pages/register_page_controller')
const LoginPageController = () =>
  import('#infrastructure/http/controllers/pages/login_page_controller')
const LandingPageController = () =>
  import('#infrastructure/http/controllers/pages/landing_page_controller')
const HomePageController = () =>
  import('#infrastructure/http/controllers/pages/home_page_controller')
const CharacterListPageController = () =>
  import('#infrastructure/http/controllers/pages/character_list_page_controller')
const WorldPageController = () =>
  import('#infrastructure/http/controllers/pages/world_page_controller')

const LoginController = () => import('#infrastructure/http/controllers/auth/login_controller')
const LogoutController = () => import('#infrastructure/http/controllers/auth/logout_controller')
const RegisterController = () => import('#infrastructure/http/controllers/auth/register_controller')

const LootController = () => import('#infrastructure/http/controllers/loot_controller')

const UpdateInventoryItemPositionController = () =>
  import('#infrastructure/http/controllers/inventory/update_inventory_item_position_controller')
const CharacterPageController = () =>
  import('#infrastructure/http/controllers/pages/character_page_controller')
const CreateCharacterController = () =>
  import('#infrastructure/http/controllers/character/create_character_controller')
// endregion

router.get('/', [LandingPageController])

router.get('/login', [LoginPageController]).as('login.get')
router.post('/login', [LoginController]).as('login.post')
router.get('/logout', [LogoutController])
router.get('/register', [RegisterPageController]).as('register.get')
router.post('/register', [RegisterController]).as('register.post')

router
  .group(() => {
    router
      .get('/game/:characterId', [HomePageController])
      .where('id', router.matchers.uuid())
      .as('game')
    router.get('/characters', [CharacterListPageController])
    router.get('/game/:characterId/profile', [CharacterPageController])
    router
      .get('/game/world/:worldId', [WorldPageController])
      .where('worldId', router.matchers.uuid())

    router.post('/characters', [CreateCharacterController]).as('character.store')
    router.get('/world/loot/:worldId', [LootController]).where('id', router.matchers.uuid())
    router
      .put('/inventory/:characterId/item/:itemId', [UpdateInventoryItemPositionController])
      .where('characterId', router.matchers.uuid())
      .where('itemId', router.matchers.uuid())
  })
  .use(middleware.auth())
