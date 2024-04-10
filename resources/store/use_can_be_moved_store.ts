import { create } from 'zustand'

interface CanBeMovedStore {
  canBeMoved: boolean
  setCanBeMoved: (newValue: boolean) => void
}

export const useCanBeMovedStore = create<CanBeMovedStore>((set) => ({
  canBeMoved: false,
  setCanBeMoved: (newValue) => set(() => ({ canBeMoved: newValue })),
}))
