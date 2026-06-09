import { create, type StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

import { type InventorySlice, inventorySlice } from '~/store/inventory_store'
import { type WorldsSlice, worldsSlice } from '~/store/worlds_store'

export interface RootState extends InventorySlice, WorldsSlice {}

type Mutators = [['zustand/devtools', never]]

export const useStore = create<RootState, Mutators>(
  devtools((...args) => ({
    ...inventorySlice(...args),
    ...worldsSlice(...args),
  }))
)

export type SliceStateCreator<TSlice> = StateCreator<RootState, Mutators, [], TSlice>
