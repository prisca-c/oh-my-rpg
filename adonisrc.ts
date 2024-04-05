import { defineConfig } from '@adonisjs/core/app'

export default defineConfig({
  unstable_assembler: {
    onBuildStarting: [() => import('@adonisjs/vite/build_hook')],

    /**
     * Temporary code to handle HotHook messages
     * Will be moved to @adonisjs/core or @hot-hook/adonis later
     */
    onHttpServerMessage: [
      async () => ({
        default: (ui, message, actions) => {
          if (message.type === 'hot-hook:full-reload') {
            ui.logger.log(
              `${ui.colors.green('full-reload')} due to ${ui.colors.cyan(message.path || message.paths.join(', '))}`,
            )
            actions.restartServer()
          }

          if (message.type === 'hot-hook:invalidated') {
            const path = message.path || message.paths[0]

            ui.logger.log(`${ui.colors.yellow('invalidated')} ${ui.colors.cyan(path)}`)
          }
        },
      }),
    ],
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
  ],

  /*
  |--------------------------------------------------------------------------
  | Preloads
  |--------------------------------------------------------------------------
  |
  | List of modules to import before starting the application.
  |
  */
  preloads: [() => import('./start/routes.js'), () => import('./start/kernel.js')],

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
        files: ['tests/unit/**/*.spec(.ts|.js)'],
        name: 'unit',
        timeout: 2000,
      },
      {
        files: ['tests/functional/**/*.spec(.ts|.js)'],
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
      pattern: 'resources/views/**/*.edge',
      reloadServer: false,
    },
  ],

  assetsBundler: false,
})
