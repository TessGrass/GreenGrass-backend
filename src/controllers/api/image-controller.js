
import createError from 'http-errors'
/* import fetch from 'node-fetch' */
import { User } from '../../models/image-model.js'
/**
 * Represents a Image Controller class.
 */
export class ImageController {
  /**
   * Fetching image from authorized owner.
   *
   * @param {object} req - Express request object.
   * @param {object} res  - Express respons object.
   * @param {Function} next - Express next middleware function.
   */
  async getInfo (req, res, next) {
    console.log(req.body.username)
    console.log(req.body.userId)
    console.log('getinfo')
    try {
      const getInfoDb = await User.find({ userId: req.body.userId })
      res
        .status(200)
        .json(getInfoDb)
      console.log(getInfoDb)
    } catch (error) {
      const err = createError(500)
      next(err)
    }
  }

  /**
   * Get a specific image.
   *
   * @param {object} req - Express request object.
   * @param {object} res  - Express respons object.
   * @param {Function} next - Express next middleware function.
   */
  async getSpecificImage (req, res, next) {
    try {
      const image = await Image.find({ imgId: req.image.imgId })
      res
        .status(200)
        .json(image)
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
  async postInfo (req, res, next) {
    console.log('postimage')
    console.log(req.body.name)
    console.log(req.body.userId)
    console.log(req.body.description)
    try {
      const infoSchema = new User({
        userName: req.body.userName,
        userId: req.body.userId,
        description: req.body.description
      })
      await infoSchema.save()
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
