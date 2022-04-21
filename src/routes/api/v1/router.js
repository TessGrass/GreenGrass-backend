import express from 'express'
import { router as imageRouter } from './image-router.js'

export const router = express.Router()

// router.get('/', (req, res) => res.json({ message: 'This bad boy runs!' }))
router.use('/', imageRouter)
