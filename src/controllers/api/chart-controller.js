import createError from 'http-errors'
/* import fetch from 'node-fetch' */
import { Chart } from '../../models/chart-model.js'

/**
 * Represents a Chart controller.
 */
export class ChartController {
  /**
   * Fetching image from authorized owner.
   *
   * @param {object} req - Express request object.
   * @param {object} res  - Express respons object.
   * @param {Function} next - Express next middleware function.
   */
  async getChartInfo (req, res, next) {
    console.log('----getChartInfo----')
    console.log(req.params.id)
    console.log(req.body)
    try {
      if (req.body.length > 0) {
      const response = await Chart.find({ userId: req.params.id })
      res
        .status(200)
        .json(response)
      console.log(response)
    } else {
      res.sendStatus(404)
    }
    } catch (error) {
      const err = createError(500)
      next(err)
    }
  }

  /**
   * Post image to Image service.
   *
   * @param {object} req - Express request object.
   * @param {object} res  - Express respons object.
   * @param {Function} next - Express next middleware function.
   */
  async postChartData (req, res, next) {
    console.log('----postChartData----')
    console.log(req.body)

    try {
      const chartSchema = new Chart({
        userId: req.body.UserId,
        month: req.body.month,
        irrigation: req.body.irrigation,
        seeds: req.body.seed,
        fertilizer: req.body.fertilizer
      })
      await chartSchema.save()
    /*    res
        .status(201)
        .json(infoSchema) */
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
   * Post image to Image service.
   *
   * @param {object} req - Express request object.
   * @param {object} res  - Express respons object.
   * @param {Function} next - Express next middleware function.
   */
  async putChartData (req, res, next) {
    try {
      console.log('----putChartData----')
      console.log(req.body)
      const userId = req.body.UserId
      const body = {
        userId: req.body.UserId,
        month: req.body.month,
        irrigation: req.body.irrigation,
        seeds: req.body.seed,
        fertilizer: req.body.fertilizer
      }
      const fetchedUser = await Chart.find({ userId })
      const id = fetchedUser[0]._id
      const putChart = await Chart.findByIdAndUpdate(id, body)
      await putChart.save()
      res
        .status(204)
        .json(putChart)
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
}
