import prisma from '../models/prismaClient.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

interface RegisterData {
  name: string
  email: string
  password: string
}

interface LoginData {
  email: string
  password: string
}

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

const register = async (data: RegisterData) => {
  const hashedPassword = await bcrypt.hash(data.password, 10)
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword
    }
  })
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' })
  return { user: { id: user.id, name: user.name, email: user.email }, token }
}

const login = async (data: LoginData) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } })
  if (!user || !(await bcrypt.compare(data.password, user.password))) {
    throw new Error('Invalid credentials')
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' })
  return { user: { id: user.id, name: user.name, email: user.email }, token }
}

export default { register, login }