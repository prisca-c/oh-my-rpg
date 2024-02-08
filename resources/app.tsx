import './css/app.css'

import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import type { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react'

import PublicLayout from '@/layouts/public_layout'
import PrivateLayout from '@/layouts/private_layout'

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
  resolve: (name) => {
    const pages = import.meta.glob('./pages/**/*.tsx', { eager: true })
    const page: any = pages[`./pages/${name}.tsx`]
    page.default.layout = name.startsWith('private')
      ? (page: PageType) => <PrivateLayout>{page}</PrivateLayout>
      : (page: PageType) => <PublicLayout>{page}</PublicLayout>

    return page
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
