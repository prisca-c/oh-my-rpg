import React from 'react'

type CenterProps = {
  children: React.ReactNode
  type?: 'grid' | 'flex'
  heightFull?: boolean
  className?: string
}

export const Center = ({
  children,
  type = 'grid',
  heightFull = false,
  className = '',
}: CenterProps) => {
  const centerType = {
    grid: 'grid place-items-center',
    flex: 'flex justify-center items-center',
  }
  const classes = [centerType[type], heightFull ? 'h-full' : '', className].join(' ')
  return <div className={classes}>{children}</div>
}
