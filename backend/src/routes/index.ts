import { Router } from 'express'
import authController from '../controllers/authController.ts'

const router = Router()

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

export default router