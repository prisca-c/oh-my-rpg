import { useState } from 'react'

import { Flex } from '@/components/utils/flex'
import { Center } from '@/components/utils/center'
import { Typography } from '@/components/utils/typography'

export default function Home() {
  const [count, setCount] = useState(0)
  const increment = () => setCount(count + 1)

  return (
    <Center type={'grid'} heightFull>
      <Flex direction={'col'} justify={'center'} align={'center'} className={'h-full gap-6'}>
        <Typography type={'h1'} size={'5xl'} className={'font-bold text-center'}>
          Hello World
        </Typography>
        <div>
          <p>Count: {count}</p>
          <button onClick={increment}>Increment</button>
        </div>
      </Flex>
    </Center>
  )
}
