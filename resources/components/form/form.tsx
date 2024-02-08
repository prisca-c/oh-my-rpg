type FormProps = {
  method: string
  onSubmit: (e: Event) => void
  children: JSX.Element<any>
  textCenter?: boolean
}
export const Form = ({ onSubmit, children, textCenter = false, method, ...props }: FormProps) => {
  const classList = ['flex', 'flex-col', 'gap-2']
  if (textCenter) classList.push('text-center')
  const classString = classList.join(' ')

  return (
    <form onsubmit={onSubmit} method={method} {...props} class={classString}>
      {children}
    </form>
  )
}
