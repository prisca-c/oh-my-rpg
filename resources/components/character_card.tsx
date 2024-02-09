import type Character from '#models/character'

export const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <a href={`/game/${character.id}`}>
      <div className={'border-2 border-gray-300 rounded-md p-2'}>
        <h2>{character.name}</h2>
        <p>Level: {character.level}</p>
      </div>
    </a>
  )
}
