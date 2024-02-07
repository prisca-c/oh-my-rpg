import { defineConfig } from 'adonisjsx'
import { DefaultLayout } from '#domain/resources/layouts/default_layout'

const jsxConfig = defineConfig({
  defaultLayout: DefaultLayout,
})

export default jsxConfig
