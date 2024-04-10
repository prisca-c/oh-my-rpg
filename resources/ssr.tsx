import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'

import PublicLayout from '#resources/views/layouts/public_layout'
import PrivateLayout from '#resources/views/layouts/private_layout'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('./views/pages/**/*.tsx', { eager: true })
      const page: any = pages[`./views/pages/${name}.tsx`]
      page.default.layout = name.startsWith('private')
        ? (page) => <PrivateLayout>{page}</PrivateLayout>
        : (page) => <PublicLayout>{page}</PublicLayout>

      return page
    },
    setup: ({ App, props }) => <App {...props} />,
  })
}
