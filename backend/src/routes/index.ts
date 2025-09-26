import { Router } from 'express'
import authController from '../controllers/authController.js'
import postRoutes from './postRoutes'
import userRoutes from './userRoutes'
import friendRoutes from './friendRoutes'
import messageRoutes from './messageRoutes'

const router = Router()

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.use('/posts', postRoutes)
router.use('/users', userRoutes)
router.use('/friends', friendRoutes)
router.use('/messages', messageRoutes)

export default router