import React from 'react'

type FormProps = {
  method: string
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  children: React.ReactNode
  textCenter?: boolean
}

export const Form = ({ onSubmit, children, textCenter = false, method, ...props }: FormProps) => {
  const classList = ['flex', 'flex-col', 'gap-2']
  if (textCenter) classList.push('text-center')
  const classString = classList.join(' ')

  return (
    <form onSubmit={onSubmit} method={method} {...props} className={classString}>
      {children}
    </form>
  )
}
