import vine from '@vinejs/vine'
import db from '@adonisjs/lucid/services/db'
import type { FieldContext } from '@vinejs/vine/types'

/**
 * Options accepted by the unique rule
 */
export type Options = {
  table: string
  column: string
}

async function unique(value: unknown, options: Options, field: FieldContext) {
  /**
   * We do not want to deal with non-string
   * values. The "string" rule will handle
   * the validation.
   */
  if (typeof value !== 'string') {
    return
  }

  const row = await db
    .from(options.table)
    .select(options.column)
    .where(options.column, value)
    .first()

  if (row) {
    field.report('The {{ field }} field is not unique', 'unique', field)
  }
}

async function exists(value: unknown, options: Options, field: FieldContext) {
  /**
   * We do not want to deal with non-string
   * values. The "string" rule will handle
   * the validation.
   */
  if (typeof value !== 'string') {
    return
  }

  const row = await db
    .from(options.table)
    .select(options.column)
    .where(options.column, value)
    .first()

  if (!row) {
    field.report('The {{ field }} field does not exist', 'exists', field)
  }
}

/**
 * Options accepted by the relationCount rule
 */
export type RelationCountOptions = {
  table: string
  column: string
  maxCount: number
}

async function relationCount(value: unknown, options: RelationCountOptions, field: FieldContext) {
  /**
   * We do not want to deal with non-string
   * values. The "string" rule will handle
   * the validation.
   */
  if (typeof value !== 'string') {
    return
  }

  const count = await db
    .from(options.table)
    .count('*', 'count')
    .where(options.column, value)
    .first()

  const entityCount = count?.count || 0

  if (entityCount > options.maxCount) {
    field.report(
      `The {{ field }} field has more than ${options.maxCount} related records`,
      'relationCount',
      field
    )
  }
}

export const uniqueRule = vine.createRule(unique)
export const existsRule = vine.createRule(exists)
export const relationCountRule = vine.createRule(relationCount)
