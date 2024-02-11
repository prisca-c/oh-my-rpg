import React from 'react'

type TypographyProps = {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
  align?: 'left' | 'center' | 'right'
  children: string
  className?: string
}

export const Typography = ({
  type,
  children,
  size = 'md',
  className,
  align = 'left',
}: TypographyProps): React.ReactElement => {
  const Tag = type
  const textSizes = {
    'sm': 'text-sm',
    'md': 'text-md',
    'lg': 'text-lg',
    'xl': 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
  }
  const textAlignment = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return <Tag className={`${textSizes[size]} ${textAlignment[align]} ${className}`}>{children}</Tag>
}
