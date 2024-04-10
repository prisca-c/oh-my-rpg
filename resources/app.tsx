/// <reference types="vite/client" />
import './css/app.css'

import { createRoot } from 'react-dom/client'
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

void createInertiaApp({
  progress: {
    color: '#16a34a',
  },
  resolve: (name: string) => {
    const pages = import.meta.glob('./views/pages/**/*.tsx', { eager: true })
    const page: any = pages[`./views/pages/${name}.tsx`]
    page.default.layout = name.startsWith('private')
      ? (page: PageType) => <PrivateLayout>{page}</PrivateLayout>
      : (page: PageType) => <PublicLayout>{page}</PublicLayout>

    return page
  },
  setup({ el, App, props }: any) {
    const root = createRoot(el)
    root.render(<App {...props} />)
  },
})
