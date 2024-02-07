type TypographyProps = {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
  children: string
  className?: string
}

export const Typography = ({ type, children, size, className }: TypographyProps) => {
  const Tag = type
  return <Tag class={`text-${size} ${className}`}>{children}</Tag>
}
