import type Character from '#models/character'
import { Container, Typography } from '#components/utils/index'

type LeaderboardProps = {
  leaderboard: Character[]
}

export const Leaderboard = ({ leaderboard }: LeaderboardProps) => {
  return (
    <Container
      layout={'flex'}
      direction={'col'}
      justify={'start'}
      align={'center'}
      className={'h-full p-4'}
      gap={6}
      bg={'lightGray'}
      rounded
    >
      <Typography type={'h2'} size={'lg'} className={'font-bold text-center'}>
        Leaderboard
      </Typography>
      <table className={'w-full'}>
        <thead>
          <tr>
            <th className={'text-start'}>Name</th>
            <th className={'text-end'}>Level</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((character) => (
            <tr key={character.id}>
              <td className={'text-start truncate'}>{character.name}</td>
              <td className={'text-end'}>{character.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}
