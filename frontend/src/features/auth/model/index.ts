import { useAppStore } from '../../../app/store'
import api from '../../../shared/lib/api'
import { User } from '../../../entities/user/types'

interface AuthResponse {
  user: User
  token: string
}

export function useAuth() {
  const { setUser } = useAppStore()

  const login = async (data: { email: string; password: string }) => {
    const res = await api.post<AuthResponse>('/auth/login', data)
    setUser({ ...res.data.user, token: res.data.token })
  }

  const registerUser = async (data: { name: string; email: string; password: string }) => {
    const res = await api.post<AuthResponse>('/auth/register', data)
    setUser({ ...res.data.user, token: res.data.token })
  }

  return { login, registerUser }
}