import express from 'express'
import { ChartController } from '../../../controllers/api/chart-controller.js'
import { AuthController } from '../../../controllers/api/auth-controller.js'
import { TodoController } from '../../../controllers/api/todo-controller.js'
export const router = express.Router()

const chartController = new ChartController()
const authController = new AuthController()
const todoController = new TodoController()

router.get('/chart/:id', authController.authenticateToken, chartController.getChartData)
router.get('/todo/:id', authController.authenticateToken, todoController.getTodoData)
router.post('/chart', authController.authenticateToken, chartController.updateChartData)
router.post('/todo', authController.authenticateToken, todoController.postTodoData)
router.patch('/todo/:id', authController.authenticateToken, todoController.patchTodoData)
router.delete('/todo/:id', authController.authenticateToken, todoController.deleteTodoData)
