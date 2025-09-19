import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  user: { id: string; name: string; token: string } | null
  setUser: (user: AppState['user']) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user })
    }),
    { name: 'app-storage' }
  )
)