/// <reference types="vite/client" />
/// <reference path="../../../adonisrc.ts" />
/// <reference path="../../backend/core/config/inertia.ts" />
import '@unocss/reset/tailwind.css'
import './app.css'
import 'virtual:uno.css'

import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import type { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react'
import PrivateLayout from '~/features/layouts/private_layout'
import PublicLayout from '~/features/layouts/public_layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
    const pages = import.meta.glob('../features/pages/**/*.tsx', { eager: true })
    const page: any = pages[`../features/pages/${name}.tsx`]
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
