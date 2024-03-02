import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'

import PublicLayout from '@/layouts/public_layout'
import PrivateLayout from '@/layouts/private_layout'

export default function render(page) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('./pages/**/*.tsx', { eager: true })
      const page: any = pages[`./pages/${name}.tsx`]
      page.default.layout = name.startsWith('private')
        ? (page) => <PrivateLayout>{page}</PrivateLayout>
        : (page) => <PublicLayout>{page}</PublicLayout>

      return page
    },
    setup: ({ App, props }) => <App {...props} />,
  })
}
