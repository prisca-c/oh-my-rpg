export const Button = ({ children, type = 'button', ...props }) => {
  return (
    <button type={type} {...props} class={'bg-blue-500 text-white p-2 rounded-md'}>
      {children}
    </button>
  )
}
