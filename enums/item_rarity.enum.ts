export enum ItemRarity {
  RARE = 'rare',
  EPIC = 'epic',
  QUEST = 'quest',
  COMMON = 'common',
  MYTHIC = 'mythic',
  SECRET = 'secret',
  UNCOMMON = 'uncommon',
  LEGENDARY = 'legendary',
}

export const itemRarityDropChance: Record<ItemRarity, number> = {
  [ItemRarity.RARE]: 0.08,
  [ItemRarity.EPIC]: 0.06,
  [ItemRarity.QUEST]: 0.1,
  [ItemRarity.COMMON]: 0.584,
  [ItemRarity.MYTHIC]: 0.01,
  [ItemRarity.SECRET]: 0.001,
  [ItemRarity.UNCOMMON]: 0.15,
  [ItemRarity.LEGENDARY]: 0.015,
} as const
