import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import PrivateLayout from '#frontend/layouts/private_layout'
import PublicLayout from '#frontend/layouts/public_layout'
import { PageType } from '~/app/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function render(page: any) {
  const queryClient = new QueryClient()

  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
      const page: any = pages[`../pages/${name}.tsx`]
      page.default.layout = name.startsWith('private')
        ? (page: PageType) => <PrivateLayout>{page}</PrivateLayout>
        : (page: PageType) => <PublicLayout>{page}</PublicLayout>

      return page
    },
    setup: ({ App, props }) => (
      <QueryClientProvider client={queryClient}>
        <App {...props} />
      </QueryClientProvider>
    ),
  })
}
