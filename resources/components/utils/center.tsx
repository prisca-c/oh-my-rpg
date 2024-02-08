import React from 'react'

type CenterProps = {
  children: React.ReactNode
  type?: 'grid' | 'flex'
  heightFull?: boolean
}

export const Center = ({ children, type = 'grid', heightFull = false }: CenterProps) => {
  const centerType = {
    grid: 'grid place-items-center',
    flex: 'flex justify-center items-center',
  }
  const classes = `${centerType[type]} ${heightFull ? 'h-full' : ''}`
  return <div className={classes}>{children}</div>
}
