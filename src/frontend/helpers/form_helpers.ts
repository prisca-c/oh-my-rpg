export const getErrorByField = <T>(errors: Record<keyof T, T> | undefined, field: string) => {
  if (!errors) return
  if (!errors[field]) return

  return errors[field][0]
}
