type InputGroupProps = {
  label: string
  name: string
  type: string
  id: string
  error?: string
  autoComplete?: string
  props?: any
}

export const InputGroup = ({
  label,
  name,
  type,
  id,
  error,
  autoComplete,
  ...props
}: InputGroupProps) => {
  return (
    <div className={'flex flex-col'}>
      {error && <p className={'text-red-500'}>{error}</p>}
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        className={'border-2 border-gray-300 rounded-md p-2'}
        autoComplete={autoComplete}
        {...props}
      />
    </div>
  )
}
