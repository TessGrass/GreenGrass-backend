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
    console.log(req.body)
    try {
      if (req.params.id.length > 0) {
        const response = await Todo.find({ userId: req.params.id })
        res
          .status(200)
          .json(response)
        console.log(response)
      } else {
        res.sendStatus(204)
      }
    } catch (error) {
      const err = createError(500)
      next(err)
    }
  }

  /**
   * Post tododata to database.
   *
   * @param {object} req - Express request object.
   * @param {object} res  - Express respons object.
   * @param {Function} next - Express next middleware function.
   */
  async postTodoData (req, res, next) {
    console.log('----postTodoData----')
    console.log(req)
    console.log(req.body)
    try {
      const response = await Todo.find({ userId: req.body.UserId })
      if (response.length === 0) {
        const todoSchema = new Todo({
          userId: req.body.UserId,
          title: req.body.title,
          completed: req.body.completed
        })
        await todoSchema.save()
        res
          .sendStatus(204)
      } else {
        res
          .sendStatus(404)
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
   * Put chartData to database.
   *
   * @param {object} req - Express request object.
   * @param {object} res  - Express respons object.
   * @param {Function} next - Express next middleware function.
   */
  async deleteTodoData (req, res, next) {
    try {
      console.log('----deleteTodoData----')
      console.log(req.body)
      /* const userId = req.body.UserId
      const body = {
        userId: req.body.UserId,
        period: req.body.period,
        irrigation: req.body.irrigation,
        seeds: req.body.seed,
        fertilizer: req.body.fertilizer
      }
      const fetchedUser = await Todo.find({ userId })
      const id = fetchedUser[0]._id
      const putChart = await Todo.findByIdAndUpdate(id, body)
      await putChart.save()
      res
        .status(204)
        .json(putChart) */
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
  /*  await Image.findByIdAndDelete(image.id) */
}
