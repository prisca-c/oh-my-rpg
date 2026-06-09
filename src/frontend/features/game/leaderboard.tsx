import type Character from '#infrastructure/models/character'
import { Container, Typography } from '~/common/components/utils'

type LeaderboardProps = {
  leaderboard: Character[]
}

export const Leaderboard = ({ leaderboard }: LeaderboardProps) => {
  return (
    <Container
      direction={'col'}
      justify={'start'}
      align={'center'}
      className={'h-full p-4'}
      gap={6}
      bg={'lightGray'}
      rounded
    >
      <Typography type={'h2'} size={'lg'} className={'text-center font-bold'}>
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
              <td className={'truncate text-start'}>{character.name}</td>
              <td className={'text-end'}>{character.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}
