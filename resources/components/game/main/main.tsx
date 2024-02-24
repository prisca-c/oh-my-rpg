import { Container, Typography } from '@/components/utils'

export const Main = () => {
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
    </Container>
  )
}
