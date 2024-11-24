import { Container, Typography } from '~/common/components/utils'
import { router, usePage } from '@inertiajs/react'
import { Button } from '~/common/components/button'

export const Main = () => {
  const { characterId } = usePage().props

  const goToCharacterProfile = () => {
    router.visit(`/game/${characterId}/profile`)
  }

  return (
    <Container
      layout={'flex'}
      direction={'col'}
      justify={'center'}
      align={'center'}
      className={'h-full w-full'}
      gap={6}
      rounded
      bg={'lightPrimary'}
    >
      <Typography type={'h1'} size={'xl'} className={'font-bold text-center'}>
        Main
      </Typography>
      <Button onClick={goToCharacterProfile}>Go to Profile</Button>
    </Container>
  )
}
