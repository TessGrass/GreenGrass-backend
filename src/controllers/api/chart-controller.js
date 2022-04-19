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
      const response = await Chart.find({ userId: req.params.id })
      res
        .status(200)
        .json(response)
      console.log(response)
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
  async postChartInfo (req, res, next) {
    console.log('----postChartInfo----')
    console.log(req.body)

    try {
      const chartSchema = new Chart({
        userId: req.body.UserId,
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
}
