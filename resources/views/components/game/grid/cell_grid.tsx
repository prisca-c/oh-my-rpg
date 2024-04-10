import React from 'react'

interface CellGridProps {
  children: React.ReactNode
}

export const CellGrid = (props: CellGridProps) => {
  const { children } = props
  return <div className={'bg-amber-100 border-2 border-gray-800 h-8 w-8'}>{children}</div>
}
