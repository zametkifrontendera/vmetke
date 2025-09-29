import axios from 'axios'
import { useAppStore } from '../../app/store'

const resolvedBaseURL =
  import.meta.env.VITE_API_BASE_URL || `${typeof window !== 'undefined' ? window.location.origin : ''}/api`;

const api = axios.create({
  baseURL: resolvedBaseURL,
  headers: { 'Content-Type': 'application/json' }
})

// Функция для получения токена без хуков
const getAuthToken = () => {
  try {
    const { user } = useAppStore.getState()
    return user?.token || null
  } catch {
    return null
  }
}

api.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api