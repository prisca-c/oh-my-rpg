import React from 'react'
import { Center } from '~/common/components/utils/center'

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={'h-screen'}>
      <Center
        type={'grid'}
        className={'h-screen max-h-screen max-w-screen w-screen overflow-hidden'}
      >
        {children}
      </Center>
    </div>
  )
}
