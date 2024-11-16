export const getErrorByField = <T>(
  errors: Record<keyof T, string> | undefined,
  field: keyof T
): string | undefined => {
  if (!errors) return
  if (!errors[field] || errors[field].length === 0) return

  return errors[field][0]
}
