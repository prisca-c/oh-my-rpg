import React from 'react'

import { Center } from '#components/utils/index'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={'h-screen'}>
      <Center type={'grid'} heightFull>
        {children}
      </Center>
    </div>
  )
}
