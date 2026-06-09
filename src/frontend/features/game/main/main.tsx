import { Container, Typography } from '~/common/components/utils'
import { router, usePage } from '@inertiajs/react'
import { Button } from '~/common/components/button'
import { WorldList } from '~/features/game/adventure/world_list'

export const Main = () => {
  const { characterId } = usePage().props

  const goToCharacterProfile = () => {
    router.visit(`/game/${characterId}/profile`)
  }

  return (
    <Container
      direction={'col'}
      justify={'center'}
      align={'center'}
      className={'h-full w-full'}
      gap={6}
      rounded
      bg={'lightPrimary'}
    >
      <Typography type={'h1'} size={'xl'} className={'text-center font-bold'}>
        Main
      </Typography>
      <Button onClick={goToCharacterProfile}>Go to Profile</Button>
      <WorldList />
    </Container>
  )
}
