import { Children } from '@kitajs/html'

type CenterProps = {
  children: Children
  middle?: boolean
}

export const Center = ({ children, middle = true }: CenterProps) => {
  return <div class={`grid place-items-center ${middle ? 'min-h-screen' : ''}`}>{children}</div>
}
