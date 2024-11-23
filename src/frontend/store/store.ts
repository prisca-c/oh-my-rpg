import { InventorySlice, createInventorySlice } from '~/store/use_inventory_store'
import { create } from 'zustand'

export interface RootState extends InventorySlice {}

export const useStore = create<RootState>((...args) => ({
  ...createInventorySlice(...args),
}))
