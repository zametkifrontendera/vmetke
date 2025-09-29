import { Request, Response } from 'express'
import authService from '../services/authService'

// const register = async (req: Request, res: Response) => {
//   const { name, email, password } = req.body
//   const { user, token } = await authService.register({ name, email, password })
//   res.json({ user, token })
// }

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    const { user, token } = await authService.register({ name, email, password })
    res.json({ user, token })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const { user, token } = await authService.login({ email, password })
    res.json({ user, token })
  } catch (err: any) {
    const message = err?.message || 'Login failed'
    const isInvalidCreds = message.toLowerCase().includes('invalid')
    res.status(isInvalidCreds ? 401 : 500).json({ error: message })
  }
}

export default { register, login }