import { create } from 'zustand'

import type World from '#models/world'

type WorldsState = {
  worlds: World[]
  setWorlds: (world: World[]) => void
}

export const useWorldsStore = create<WorldsState>((set) => ({
  worlds: [],
  setWorlds: (worlds: World[]) => set({ worlds }),
}))
