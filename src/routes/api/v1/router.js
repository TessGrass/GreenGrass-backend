import express from 'express'
import { router as resourceRouter } from './resource-router.js'

export const router = express.Router()

router.use('/', resourceRouter)
