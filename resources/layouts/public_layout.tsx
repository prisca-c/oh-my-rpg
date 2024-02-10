import React from 'react'

import { Center } from '@/components/utils'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <Center type={'grid'} heightFull>
      {children}
    </Center>
  )
}
