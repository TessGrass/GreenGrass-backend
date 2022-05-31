import createError from 'http-errors'
import { Todo } from '../../models/todos-model.js'

/**
 * Represents a Todo controller.
 */
export class TodoController {
  /**
   * Fetching data from authorized owner.
   *
   * @param {object} req - Express request object.
   * @param {object} res  - Express respons object.
   * @param {Function} next - Express next middleware function.
   */
  async getTodoData (req, res, next) {
    console.log('----getTodoData----')
    try {
      const response = await Todo.find({ userId: req.params.id })
      if (response[0]._id) {
        res
          .status(200)
          .json(response)
      }
    } catch (err) {
      let error = err
      if (err.name === 'TypeError') {
        error = createError(404)
      } else {
        error = createError(500)
      }
      next(error)
    }
  }

  /**
   * Post Tododata to database.
   *
   * @param {object} req - Express request object.
   * @param {object} res  - Express respons object.
   * @param {Function} next - Express next middleware function.
   */
  async postTodoData (req, res, next) {
    console.log('------postTodoData------')
    try {
      if (!req.body.UserId || !req.body.title || req.body.completed === undefined) {
        const err = createError(400)
        next(err)
      } else {
        const todoSchema = new Todo({
          userId: req.body.UserId,
          title: req.body.title,
          completed: req.body.completed
        })
        await todoSchema.save()
        res
          .sendStatus(201)
      }
    } catch (error) {
      const err = createError(500)
      next(err)
    }
  }

  /**
   * Patch Tododata to database.
   *
   * @param {object} req - Express request object.
   * @param {object} res  - Express respons object.
   * @param {Function} next - Express next middleware function.
   */
  async patchTodoData (req, res, next) {
    console.log('----patchTodoData----')
    const isEmpty = Object.keys(req.body).length === 0
    try {
      if (isEmpty) {
        const err = createError(400)
        next(err)
      } else {
        const patchTodo = await Todo.findByIdAndUpdate(req.params.id, req.body)
        if (patchTodo !== null) {
          await patchTodo.save()
          res.sendStatus(204)
        } else {
          const err = createError(404)
          next(err)
        }
      }
    } catch (err) {
      let error = err
      if (err.name === 'ValidationError') {
        error = createError(400)
      } else {
        error = createError(500)
      }
      next(error)
    }
  }

  /**
   * Delete TodoData in database.
   *
   * @param {object} req - Express request object.
   * @param {object} res  - Express respons object.
   * @param {Function} next - Express next middleware function.
   */
  async deleteTodoData (req, res, next) {
    try {
      console.log('----deleteTodoData----')
      const response = await Todo.findById(req.params.id)
      if (response !== null) {
        await Todo.findByIdAndDelete(req.params.id)
        res
          .sendStatus(204)
      } else {
        const err = createError(404)
        next(err)
      }
    } catch (err) {
      let error = err
      if (err.name === 'CastError') {
        error = createError(404)
      } else {
        error = createError(500)
      }
      next(error)
    }
  }
}
