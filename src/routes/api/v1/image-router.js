import express from 'express'
import { ChartController } from '../../../controllers/api/chart-controller.js'
import { AuthController } from '../../../controllers/api/auth-controller.js'
import { TodoController } from '../../../controllers/api/todo-controller.js'
export const router = express.Router()

const chartController = new ChartController()
const authController = new AuthController()
const todoController = new TodoController()
/* router.get('/images', (req, res, next) => controller.getInfo(req, res, next)) */
/* router.get('/chart/:id', (req, res, next) => chartController.getChartData(req, res, next)) */

router.get('/chart/:id', authController.authenticateToken, chartController.getChartData)
router.post('/chart', authController.authenticateToken, chartController.updateChartData)
router.get('/todo/:id', todoController.getTodoData)
router.post('/todo', todoController.postTodoData)
router.patch('/todo/:id', todoController.patchTodoData)
router.delete('/todo/:id', todoController.deleteTodoData)
/* router.put('/chart', authController.authenticateToken, chartController.putChartData) */

// router.post('/chart', (req, res, next) => chartController.postChartInfo(req, res, next))
// router.post('/images', (req, res, next) => controller.postInfo(req, res, next))
/* router.delete('/images/:id', (req, res, next) => controller.deleteSpecificImage) */
/* router.get('/images/:id', (req, res, next) => controller.getSpecificImage) */

/* 1. Skrota image-controllern helt?
2. try / catch måste implementeras
3. testa/skicka statuskoder
4. Sätt kontroll på get */
