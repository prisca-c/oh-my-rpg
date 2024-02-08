export const getErrorByField = (errors: Record<string, string[]> | undefined, field: string) => {
  if (!errors) return
  if (!errors[field]) return

  return errors[field][0]
}
