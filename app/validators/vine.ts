import { VineString } from '@vinejs/vine'

import { uniqueRule } from './rules/unique.js'
import type { Options } from './rules/unique.js'

declare module '@vinejs/vine' {
  interface VineString {
    unique(options: Options): this
  }
}

VineString.macro('unique', function (this: VineString, options: Options) {
  return this.use(uniqueRule(options))
})
