import express from 'express'
import { ImageController } from '../../../controllers/api/image-controller.js'
import { ChartController } from '../../../controllers/api/chart-controller.js'
export const router = express.Router()

const controller = new ImageController()
const chartController = new ChartController()
router.get('/images', (req, res, next) => controller.getInfo(req, res, next))
router.get('/chart/:id', (req, res, next) => chartController.getChartInfo(req, res, next))
router.post('/chart', (req, res, next) => chartController.postChartInfo(req, res, next))
router.post('/images', (req, res, next) => controller.postInfo(req, res, next))

/* router.delete('/images/:id', (req, res, next) => controller.deleteSpecificImage) */
/* router.get('/images/:id', (req, res, next) => controller.getSpecificImage) */
