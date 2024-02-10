import type Character from '~/app/models/character'
import type EntityProperty from '~/app/models/entity_property'

import { Flex, Typography } from '@/components/utils'

type GameProps = {
  character: Character
  leaderboard: Character[]
  properties: EntityProperty
}

export default function Game({ character, leaderboard, properties }: GameProps) {
  return (
    <Flex direction={'col'} justify={'center'} align={'center'} className={'gap-6'}>
      <Typography type={'h1'} size={'xl'} className={'font-bold text-center'}>
        Game
      </Typography>
      <Flex direction={'row'} justify={'center'} align={'flex-start'} className={'gap-6'}>
        <Flex direction={'col'} justify={'center'} className={'gap-2 bg-gray-200 p-4 rounded-md'}>
          <Typography type={'h2'} size={'lg'} className={'font-bold text-center'}>
            Character
          </Typography>
          <h2>Name: {character.name}</h2>
          <h2>Level: {character.level}</h2>
          <h2>Experience: {character.experience}</h2>
          <h2>Constitution: {properties.constitution}</h2>
          <h2>Strength: {properties.strength}</h2>
          <h2>Dexterity: {properties.dexterity}</h2>
          <h2>Intelligence: {properties.intelligence}</h2>
          <h2>Wisdom: {properties.wisdom}</h2>
          <h2>Charisma: {properties.charisma}</h2>
          <h2>Leaderboard</h2>
        </Flex>
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
      </Flex>
    </Flex>
  )
}
