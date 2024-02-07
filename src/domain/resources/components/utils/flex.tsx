import { Children } from '@kitajs/html'

type FlexProps = {
  children: Children
  direction?: 'row' | 'col'
  justify?: 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'flex-end'
  align?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline'
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  gap?: string
  className?: string
}

export const Flex = ({
  children,
  direction = 'row',
  justify = 'flex-start',
  align = 'stretch',
  wrap = 'nowrap',
  gap = '0',
  className = '',
}: FlexProps) => {
  return (
    <div
      class={`flex flex-${direction} justify-${justify} items-${align} flex-${wrap} gap-${gap} ${className}`}
    >
      {children}
    </div>
  )
}
