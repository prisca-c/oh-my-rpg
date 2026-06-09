import { indexEntities } from '@adonisjs/core'
import { defineConfig } from '@adonisjs/core/app'
import { indexPages } from '@adonisjs/inertia'

export default defineConfig({
  hooks: {
    init: [
      indexEntities(),
      indexPages({ framework: 'react', source: 'src/frontend/features/pages' }),
    ],
    buildStarting: [() => import('@adonisjs/vite/build_hook')],
  },

  /*
  |--------------------------------------------------------------------------
  | Commands
  |--------------------------------------------------------------------------
  |
  | List of ace commands to register from packages. The application commands
  | will be scanned automatically from the "./commands" directory.
  |
  */
  commands: [() => import('@adonisjs/core/commands'), () => import('@adonisjs/lucid/commands')],

  /*
  |--------------------------------------------------------------------------
  | Service providers
  |--------------------------------------------------------------------------
  |
  | List of service providers to import and register when booting the
  | application
  |
  */
  providers: [
    () => import('@adonisjs/core/providers/app_provider'),
    () => import('@adonisjs/core/providers/hash_provider'),
    {
      file: () => import('@adonisjs/core/providers/repl_provider'),
      environment: ['repl', 'test'],
    },
    () => import('@adonisjs/auth/auth_provider'),
    () => import('@adonisjs/lucid/database_provider'),
    () => import('@adonisjs/redis/redis_provider'),
    () => import('@adonisjs/session/session_provider'),
    () => import('@adonisjs/vite/vite_provider'),
    () => import('@adonisjs/shield/shield_provider'),
    () => import('@adonisjs/core/providers/edge_provider'),
    () => import('@adonisjs/inertia/inertia_provider'),
    () => import('@adonisjs/cors/cors_provider'),
    () => import('@adonisjs/static/static_provider'),
    () => import('adonis-lucid-soft-deletes/provider'),
  ],

  /*
  |--------------------------------------------------------------------------
  | Preloads
  |--------------------------------------------------------------------------
  |
  | List of modules to import before starting the application.
  |
  */
  preloads: [
    () => import('./src/backend/core/start/routes.js'),
    () => import('./src/backend/core/start/kernel.js'),
  ],

  /*
  |--------------------------------------------------------------------------
  | Tests
  |--------------------------------------------------------------------------
  |
  | List of test suites to organize tests by their type. Feel free to remove
  | and add additional suites.
  |
  */
  tests: {
    suites: [
      {
        files: ['tests/unit/**/*.spec.{ts,js}'],
        name: 'unit',
        timeout: 2000,
      },
      {
        files: ['tests/functional/**/*.spec.{ts,js}'],
        name: 'functional',
        timeout: 30_000,
      },
    ],
    forceExit: false,
  },
  metaFiles: [
    {
      pattern: 'public/**',
      reloadServer: false,
    },
    {
      pattern: 'resources/views/edge/**/*.edge',
      reloadServer: false,
    },
  ],

  directories: {
    config: 'src/backend/core/config',
    exceptions: 'src/backend/core/exceptions',
    httpControllers: 'src/backend/infrastructure/http/controllers',
    middleware: 'src/backend/infrastructure/http/middleware',
    migrations: 'src/backend/infrastructure/database/migrations',
    models: 'src/backend/infrastructure/models',
    providers: 'src/backend/core/providers',
    seeders: 'src/backend/infrastructure/database/seeders',
    start: 'src/backend/core/start',
    validators: 'src/backend/infrastructure/validators',
  },
})
