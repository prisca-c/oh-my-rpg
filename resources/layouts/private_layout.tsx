import React from 'react'

import { Center } from '@/components/utils'

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <Center type={'grid'} className={'h-screen w-screen max-h-screen max-w-screen overflow-hidden'}>
      {children}
    </Center>
  )
}
