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
  [ItemRarity.RARE]: 0.4,
  [ItemRarity.EPIC]: 0.2,
  [ItemRarity.QUEST]: 0.5,
  [ItemRarity.COMMON]: 0.8,
  [ItemRarity.MYTHIC]: 0.01,
  [ItemRarity.SECRET]: 0.001,
  [ItemRarity.UNCOMMON]: 0.7,
  [ItemRarity.LEGENDARY]: 0.05,
} as const
