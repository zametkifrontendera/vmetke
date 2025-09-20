import { Request, Response } from 'express'
import authService from '../services/authService.ts'

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  const { user, token } = await authService.register({ name, email, password })
  res.json({ user, token })
}

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const { user, token } = await authService.login({ email, password })
  res.json({ user, token })
}

export default { register, login }