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
    console.log(req.params.id)
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
    console.log('----postTodoData----')
    console.log(req.body)
    try {
      /* const response = await Todo.find({ userId: req.body.userId })
      console.log(response) */
      const todoSchema = new Todo({
        userId: req.body.userId,
        title: req.body.title,
        completed: req.body.completed
      })
      await todoSchema.save()
      res
        .sendStatus(204)
    } catch (error) {
      const err = createError(500)
      next(err)
    }
  }

  /**
   * Delete TodoData to database.
   *
   * @param {object} req - Express request object.
   * @param {object} res  - Express respons object.
   * @param {Function} next - Express next middleware function.
   */
  async deleteTodoData (req, res, next) {
    try {
      console.log('----deleteTodoData----')
      const response = await Todo.findById(req.params.id)
      if (response) {
        await Todo.findByIdAndDelete(req.params.id)
        res
          .sendStatus(204)
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
