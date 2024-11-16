export const ENTITY = {
  NPC: 'npc',
  ENEMY: 'enemy',
  CHARACTER: 'character',
} as const

export type Entity = (typeof ENTITY)[keyof typeof ENTITY]
