import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../../entities/user/types'

interface AppState {
  user: (User & { token: string }) | null
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
