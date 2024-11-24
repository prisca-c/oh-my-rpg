import type World from '#infrastructure/models/world'
import { SliceStateCreator } from '~/store/index'

export interface WorldsSlice {
  worlds: World[]
  setWorlds: (worlds: World[]) => void
}

export const worldsSlice: SliceStateCreator<WorldsSlice> = (set) => ({
  worlds: [],
  setWorlds: (worlds: World[]) => set({ worlds }),
})
