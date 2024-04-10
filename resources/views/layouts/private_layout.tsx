import React from 'react'

import { Center } from '#components/utils/index'

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={'h-screen'}>
      <Center
        type={'grid'}
        className={'h-screen w-screen max-h-screen max-w-screen overflow-hidden'}
      >
        {children}
      </Center>
    </div>
  )
}
