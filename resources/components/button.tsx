import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  type?: 'button' | 'reset' | 'submit'
  onclick?: () => void
}

export const Button = ({
  children,
  type = 'button',
  onclick = () => {},
}: ButtonProps): React.ReactElement => {
  return (
    <button type={type} onClick={onclick} className="px-4 py-2 bg-blue-500 text-white rounded-md">
      {children}
    </button>
  )
}
