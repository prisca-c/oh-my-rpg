export const validateEmail = (email: string) => {
  return email.includes('@') && email.includes('.')
}

export const validateUsername = (username: string) => {
  return username.length > 3
}

export const validatePassword = (password: string) => {
  return password.length > 7
}

export const validatePasswordConfirmation = (passwordConfirmation: string, password: string) => {
  return passwordConfirmation === password && password.length > 7
}
