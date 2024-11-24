import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

import { InventorySlice, inventorySlice } from '~/store/inventory_store'
import { WorldsSlice, worldsSlice } from '~/store/worlds_store'

export interface RootState extends InventorySlice, WorldsSlice {}

type Mutators = [['zustand/devtools', never]]

export const useStore = create<RootState, Mutators>(
  devtools((...args) => ({
    ...inventorySlice(...args),
    ...worldsSlice(...args),
  }))
)

export type SliceStateCreator<TSlice> = StateCreator<RootState, Mutators, [], TSlice>
