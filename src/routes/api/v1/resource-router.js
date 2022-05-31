import express from 'express'
import { ChartController } from '../../../controllers/api/chart-controller.js'
import { AuthController } from '../../../controllers/api/auth-controller.js'
import { TodoController } from '../../../controllers/api/todo-controller.js'
export const router = express.Router()

const chartController = new ChartController()
const authController = new AuthController()
const todoController = new TodoController()

router.get('/chart/:id', authController.authenticateToken, authController.authorizeUser, chartController.getChartData)
router.get('/todo/:id', authController.authenticateToken, authController.authorizeUser, todoController.getTodoData)
router.post('/chart', authController.authenticateToken, authController.authorizeUser, chartController.updateChartData)
router.post('/todo', authController.authenticateToken, authController.authorizeUser, todoController.postTodoData)
router.patch('/todo/:id', authController.authenticateToken, authController.authorizeUser, todoController.patchTodoData)
router.delete('/todo/:id', authController.authenticateToken, authController.authorizeUser, todoController.deleteTodoData)
