import React from 'react'

import { getErrorByField } from '@/helpers/form_helpers'

type InputGroupProps = {
  label: string
  name: string
  type: string
  id: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  errors?: any
  autoComplete?: string
  className?: string
  valid?: boolean
  props?: any
}

export const InputGroup = ({
  label,
  name,
  type,
  id,
  value,
  errors,
  autoComplete,
  onChange,
  valid,
  className,
  ...props
}: InputGroupProps) => {
  const error = getErrorByField(errors, name)

  const inputClass = valid
    ? `border-2 border-green-500 ${className}`
    : error
      ? `border-2 border-red-500 ${className}`
      : `border-2 border-gray-300 ${className}`

  return (
    <div className={'flex flex-col'}>
      {!valid && error && <p className={'text-red-500 text-xs'}>{error}</p>}
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        className={inputClass + ' p-2 rounded-md'}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  )
}
