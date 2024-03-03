import { useWorldsStore } from '@/store/use_worlds_store'
import { Container, Typography, Card } from '@/components/utils'

export const Main = () => {
  const worlds = useWorldsStore((state) => state.worlds)
  return (
    <Container
      layout={'flex'}
      direction={'col'}
      justify={'center'}
      align={'center'}
      className={'gap-6 h-full w-full'}
      rounded
      bg={'lightPrimary'}
    >
      <Typography type={'h1'} size={'xl'} className={'font-bold text-center'}>
        Main
      </Typography>
      {worlds.map((world) => (
        <Card key={world.id}>
          <Typography type={'p'} size={'sm'} className={'font-bold'}>
            {world.name}
          </Typography>
        </Card>
      ))}
    </Container>
  )
}
