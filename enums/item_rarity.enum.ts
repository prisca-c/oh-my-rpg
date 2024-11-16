export const ITEM_RARITY = {
  COMMON: 'common',
  UNCOMMON: 'uncommon',
  QUEST: 'quest',
  RARE: 'rare',
  EPIC: 'epic',
  MYTHIC: 'mythic',
  SECRET: 'secret',
  LEGENDARY: 'legendary',
} as const

export type ItemRarity = (typeof ITEM_RARITY)[keyof typeof ITEM_RARITY]

export const itemRarityDropChance: Record<ItemRarity, number> = {
  [ITEM_RARITY.COMMON]: 0.584,
  [ITEM_RARITY.UNCOMMON]: 0.15,
  [ITEM_RARITY.QUEST]: 0.1,
  [ITEM_RARITY.RARE]: 0.08,
  [ITEM_RARITY.EPIC]: 0.06,
  [ITEM_RARITY.MYTHIC]: 0.01,
  [ITEM_RARITY.SECRET]: 0.001,
  [ITEM_RARITY.LEGENDARY]: 0.015,
} as const
