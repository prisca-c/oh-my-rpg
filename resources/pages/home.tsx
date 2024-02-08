import { useState } from 'react'

import { Typography } from '@/components/utils/typography'

export default function Home() {
  const [count, setCount] = useState(0)
  const increment = () => setCount(count + 1)

  return (
    <div>
      <Typography type={'h1'} size={'5xl'} className={'font-bold'}>
        Hello World
      </Typography>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  )
}
