import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  type?: 'button' | 'reset' | 'submit'
  onClick?: () => void
}

export const Button = ({
  children,
  type = 'button',
  onClick = () => {},
}: ButtonProps): React.ReactElement => {
  return (
    <button type={type} onClick={onClick} className="px-4 py-2 bg-blue-500 text-white rounded-md">
      {children}
    </button>
  )
}
