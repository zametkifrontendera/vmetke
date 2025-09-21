import { useAppStore } from '../../../app/store'
import api from '../../../shared/lib/api'
import { User } from '../../../entities/user/types'
import toast from 'react-hot-toast'

interface AuthResponse {
  user: User
  token: string
}

export function useAuth() {
  const { setUser } = useAppStore()

  const login = async (data: { email: string; password: string }) => {
    try {
      const res = await api.post<AuthResponse>('/auth/login', data)
      setUser({ ...res.data.user, token: res.data.token })
      toast.success('Добро пожаловать, ' + res.data.user.name + '!')
    } catch (err: any) {
      console.error('Login error:', err)
      toast.error(err.response?.data?.error || 'Ошибка входа')
    }
  }

  const registerUser = async (data: { name: string; email: string; password: string }) => {
    try {
      const res = await api.post<AuthResponse>('/auth/register', data)
      setUser({ ...res.data.user, token: res.data.token })
      toast.success('Регистрация успешна')
    } catch (err: any) {
      console.error('Register error:', err)
      toast.error(err.response?.data?.error || 'Ошибка регистрации')
    }
  }

  return { login, registerUser }
}
