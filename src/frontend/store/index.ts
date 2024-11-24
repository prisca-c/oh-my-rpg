import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

import { InventorySlice, createInventorySlice } from '~/store/use_inventory_store'

export interface RootState extends InventorySlice {}

type Mutators = [['zustand/devtools', never]]

export const useStore = create<RootState, Mutators>(
  devtools((...args) => ({
    ...createInventorySlice(...args),
  }))
)

export type SliceStateCreator<TSlice> = StateCreator<RootState, Mutators, [], TSlice>
