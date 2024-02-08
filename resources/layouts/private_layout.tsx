import React from 'react'

import { Center } from '@/components/utils/center'

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <Center type={'grid'} heightFull>
      {children}
    </Center>
  )
}
