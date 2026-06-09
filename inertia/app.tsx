/// <reference types="vite/client" />
/// <reference path="../adonisrc.ts" />
/// <reference path="../src/backend/core/config/inertia.ts" />
import '@unocss/reset/tailwind.css'
import '~/app/app.css'
import 'virtual:uno.css'

import type { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createInertiaApp } from '@inertiajs/react'
import { hydrateRoot } from 'react-dom/client'

import PrivateLayout from '~/features/layouts/private_layout'
import PublicLayout from '~/features/layouts/public_layout'

export type PageType =
  | string
  | number
  | boolean
  | ReactElement<any, string | JSXElementConstructor<any>>
  | Iterable<ReactNode>
  | ReactPortal
  | null
  | undefined

const appName = import.meta.env.VITE_APP_NAME || 'Oh My RPG!'

const queryClient = new QueryClient()

createInertiaApp({
  progress: {
    color: '#16a34a',
  },

  title: (title: string) => `${title} - ${appName}`,

  resolve: (name: string) => {
    const pages = import.meta.glob('../src/frontend/features/pages/**/*.tsx', { eager: true })
    const page: any = pages[`../src/frontend/features/pages/${name}.tsx`]
    page.default.layout = name.startsWith('private')
      ? (page: PageType) => <PrivateLayout>{page}</PrivateLayout>
      : (page: PageType) => <PublicLayout>{page}</PublicLayout>

    return page
  },

  setup({ el, App, props }) {
    hydrateRoot(
      el,
      <QueryClientProvider client={queryClient}>
        <App {...props} />
      </QueryClientProvider>
    )
  },
})
