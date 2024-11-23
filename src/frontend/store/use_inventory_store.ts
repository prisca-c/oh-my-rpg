import { StateCreator } from 'zustand'
import { produce } from 'immer'
import { InventoryDtoType, InventoryItemDtoType } from '#common/types/inventory_types'
import { RootState } from '~/store/store'

export interface InventorySlice {
  inventory: InventoryDtoType
  currentInventoryPage: number
  canMoveItems: boolean
  getPageItems: (page: number) => InventoryDtoType['items'][number]
  getCurrentPageItems: () => InventoryDtoType['items'][number]
  setCanMoveItems: (newValue: boolean) => void
  setInventorySize: (newValue: InventoryDtoType) => void
  setInventoryPage: (newValue: number) => void
  setItems: (newValue: InventoryDtoType['items']) => void
  addItem: (item: InventoryItemDtoType) => void
}

export const createInventorySlice: StateCreator<RootState, [], [], InventorySlice> = (
  set,
  get
) => ({
  inventory: {
    items: [],
    inventorySize: 0,
  },
  currentInventoryPage: 1,
  canMoveItems: false,
  getPageItems: (page) => get().inventory.items[page],
  getCurrentPageItems: () => get().inventory.items[get().currentInventoryPage],
  setCanMoveItems: (newValue) =>
    set(() => ({
      canMoveItems: newValue,
    })),
  setInventorySize: (newValue) =>
    set(() => ({
      inventory: newValue,
    })),
  setInventoryPage: (newValue) =>
    set(() => ({
      currentInventoryPage: newValue,
    })),
  setItems: (newValue) =>
    set(
      produce((state) => {
        state.inventory.items = newValue
      })
    ),
  addItem: (item) =>
    set(
      produce((state) => {
        if (!item.page) return
        state.inventory.items[item.page].push(item)
      })
    ),
})
