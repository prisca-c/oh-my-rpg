import React from 'react'

type CenterProps = {
  children: React.ReactNode
  type?: 'grid' | 'flex'
  middle?: boolean
}

export const Center = ({ children, type = 'grid', middle = false }: CenterProps) => {
  const centerType = {
    grid: 'place-items-center',
    flex: 'justify-center items-center',
  }
  const classes = `${centerType[type]} ${middle ? 'h-full' : ''}`
  return <div className={classes}>{children}</div>
}
