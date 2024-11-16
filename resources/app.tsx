/// <reference types="vite/client" />
/// <reference path="../adonisrc.ts" />
/// <reference path="../config/inertia.ts" />
import '@unocss/reset/tailwind.css'
import './css/app.css'
import 'virtual:uno.css'

import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import type { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react'

import PublicLayout from '#resources/views/layouts/public_layout'
import PrivateLayout from '#resources/views/layouts/private_layout'

type PageType =
  | string
  | number
  | boolean
  | ReactElement<any, string | JSXElementConstructor<any>>
  | Iterable<ReactNode>
  | ReactPortal
  | null
  | undefined

const appName = import.meta.env.VITE_APP_NAME || 'Oh My RPG!'

createInertiaApp({
  progress: {
    color: '#16a34a',
  },

  title: (title: string) => `${title} - ${appName}`,

  resolve: (name: string) => {
    const pages = import.meta.glob('./views/pages/**/*.tsx', { eager: true })
    const page: any = pages[`./views/pages/${name}.tsx`]
    page.default.layout = name.startsWith('private')
      ? (page: PageType) => <PrivateLayout>{page}</PrivateLayout>
      : (page: PageType) => <PublicLayout>{page}</PublicLayout>

    return page
  },

  setup({ el, App, props }) {
    hydrateRoot(el, <App {...props} />)
  },
})
