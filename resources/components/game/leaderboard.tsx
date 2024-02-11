import type Character from '~/app/models/character'

import { Flex, Typography } from '@/components/utils'

type LeaderboardProps = {
  leaderboard: Character[]
}

export const Leaderboard = ({ leaderboard }: LeaderboardProps) => {
  return (
    <Flex
      direction={'col'}
      justify={'center'}
      align={'center'}
      className={'gap-6 bg-gray-200 p-4 rounded-md w-fit'}
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
    </Flex>
  )
}
