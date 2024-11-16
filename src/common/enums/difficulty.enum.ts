export const DIFFICULTY = {
  EASY: 'easy',
  HARD: 'hard',
  NORMAL: 'normal',
  EXPERT: 'expert',
  DIVINE: 'divine',
  TUTORIAL: 'tutorial',
  HARDCORE: 'hardcore',
  INFERNAL: 'infernal',
  NIGHTMARE: 'nightmare',
  LEGENDARY: 'legendary',
} as const

export type Difficulty = (typeof DIFFICULTY)[keyof typeof DIFFICULTY]
