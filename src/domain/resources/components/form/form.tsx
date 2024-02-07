type FormProps = {
  method: string
  onSubmit: (e: Event) => void
  children: JSX.Element<any>
}
export const Form = ({ onSubmit, children, method, ...props }: FormProps) => {
  return (
    <form onsubmit={onSubmit} method={method} {...props}>
      {children}
    </form>
  )
}
