export const InputGroup = ({ label, name, type, id, error, ...props }) => {
  return (
    <div class={'flex flex-col'}>
      {error && <p class={'text-red-500'}>{error}</p>}
      <label for={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        {...props}
        class={'border-2 border-gray-300 rounded-md p-2'}
      />
    </div>
  ) as JSX.Element<any>
}
