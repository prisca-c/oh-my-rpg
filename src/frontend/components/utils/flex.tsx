import React from 'react'

type FlexProps = {
  children: React.ReactNode
  direction?: 'row' | 'col'
  justify?: 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'flex-end'
  align?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline'
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  className?: string
}

export const Flex = ({
  children,
  direction = 'row',
  justify = 'flex-start',
  align = 'stretch',
  wrap = 'nowrap',
  className = '',
}: FlexProps) => {
  const flexDirection = {
    row: 'flex-row',
    col: 'flex-col',
  }

  const flexJustify = {
    'center': 'justify-center',
    'space-between': 'justify-between',
    'space-around': 'justify-around',
    'space-evenly': 'justify-evenly',
    'flex-start': 'justify-start',
    'flex-end': 'justify-end',
  }

  const flexAlign = {
    'center': 'items-center',
    'flex-start': 'items-start',
    'flex-end': 'items-end',
    'stretch': 'items-stretch',
    'baseline': 'items-baseline',
  }

  const flexWrap = {
    'wrap': 'flex-wrap',
    'nowrap': 'flex-nowrap',
    'wrap-reverse': 'flex-wrap-reverse',
  }

  const classes = `flex ${flexDirection[direction]} ${flexJustify[justify]} ${flexAlign[align]} ${flexWrap[wrap]} ${className}`

  return <div className={classes}>{children}</div>
}
