export const ITEM_CATEGORY = {
  KEY: 'key',
  ARMOR: 'armor',
  WEAPON: 'weapon',
  CLOTHING: 'clothing',
  MATERIAL: 'material',
  ACCESSORY: 'accessory',
  CONSUMABLE: 'consumable',
  MISCELLANEOUS: 'miscellaneous',
} as const

export type ItemCategory = (typeof ITEM_CATEGORY)[keyof typeof ITEM_CATEGORY]
