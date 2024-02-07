type TypographyProps = {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  children: string
  className?: string
}

export const Typography = ({ type, children, className = '' }: TypographyProps) => {
  const Tag = type
  const typeClass = {
    h1: 'text-6xl',
    h2: 'text-5xl',
    h3: 'text-4xl',
    h4: 'text-3xl',
    h5: 'text-2xl',
    h6: 'text-xl',
    p: 'text-base',
  }
  return <Tag class={`${typeClass[type]} ${className}`}>{children}</Tag>
}
