import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'private/character_list_page': ExtractProps<
      (typeof import('../../src/frontend/features/pages/private/character_list_page.tsx'))['default']
    >
    'private/character_page': ExtractProps<
      (typeof import('../../src/frontend/features/pages/private/character_page.tsx'))['default']
    >
    'private/home_page': ExtractProps<
      (typeof import('../../src/frontend/features/pages/private/home_page.tsx'))['default']
    >
    'private/world_page': ExtractProps<
      (typeof import('../../src/frontend/features/pages/private/world_page.tsx'))['default']
    >
    'public/landing_page': ExtractProps<
      (typeof import('../../src/frontend/features/pages/public/landing_page.tsx'))['default']
    >
    'public/login_page': ExtractProps<
      (typeof import('../../src/frontend/features/pages/public/login_page.tsx'))['default']
    >
    'public/register_page': ExtractProps<
      (typeof import('../../src/frontend/features/pages/public/register_page.tsx'))['default']
    >
  }
}
