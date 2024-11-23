import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import PrivateLayout from '~/features/layouts/private_layout'
import PublicLayout from '~/features/layouts/public_layout'
import { PageType } from '~/app/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function render(page: any) {
  const queryClient = new QueryClient()

  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../features/pages/**/*.tsx', { eager: true })
      const page: any = pages[`../features/pages/${name}.tsx`]
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
