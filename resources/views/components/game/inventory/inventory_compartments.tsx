import type React from 'react'

interface InventoryCompartmentsProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  position: string
}

export const InventoryCompartments = (props: InventoryCompartmentsProps) => {
  const { children, size, position } = props
  const baseClass = 'absolute border-2 border-dark-primary bg-dark-gray bg-opacity-45'

  const sizes = {
    sm: 'w-[100px] h-[100px]',
    md: 'w-[100px] h-[120px]',
    lg: 'w-[100px] h-[200px]',
  }

  const className = `${baseClass} ${sizes[size || 'md']} ${position}`

  return <div className={className}>{children}</div>
}
