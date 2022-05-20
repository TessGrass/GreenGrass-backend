import createError from 'http-errors'
import { Chart } from '../../models/chart-model.js'

/**
 * Represents a Chart controller.
 */
export class ChartController {
  /**
   * Fetching data from authorized owner.
   *
   * @param {object} req - Express request object.
   * @param {object} res  - Express respons object.
   * @param {Function} next - Express next middleware function.
   */
  async getChartData (req, res, next) {
    console.log('----getChartData----')
    console.log(req.params.id)
    console.log(req.body)
    try {
      if (req.params.id.length > 0) {
        const response = await Chart.find({ userId: req.params.id })
        console.log(response)
        if (response.length > 0) {
          res
            .status(200)
            .json(response)
        } else {
          const err = createError(404)
          next(err)
        }
      }
    } catch (error) {
      const err = createError(500)
      next(err)
    }
  }

  /**
   * Post chartdata to database.
   *
   * @param {object} req - Express request object.
   * @param {object} res  - Express respons object.
   * @param {Function} next - Express next middleware function.
   */
  async updateChartData (req, res, next) {
    console.log('----postChartData----')
    try {
      const response = await Chart.find({ userId: req.body.UserId })
      if (response.length === 0) {
        const chartSchema = new Chart({
          userId: req.body.UserId,
          period: req.body.period,
          irrigation: req.body.irrigation,
          seeds: req.body.seed,
          fertilizer: req.body.fertilizer
        })
        await chartSchema.save()
        res
          .sendStatus(201)
      } else {
        const body = {
          userId: req.body.UserId,
          period: req.body.period,
          irrigation: req.body.irrigation,
          seeds: req.body.seed,
          fertilizer: req.body.fertilizer
        }
        const fetchedUser = await Chart.find({ userId: req.body.UserId })
        const id = fetchedUser[0]._id
        const putChart = await Chart.findByIdAndUpdate(id, body)
        await putChart.save()
        res
          .sendStatus(204)
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
  async putChartData (req, res, next) {
    try {
      console.log('----putChartData----')
      console.log(req.body)
      const userId = req.body.UserId
      const body = {
        userId: req.body.UserId,
        period: req.body.period,
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
