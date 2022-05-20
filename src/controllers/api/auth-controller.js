import { initializeApp, cert } from 'firebase-admin/app'
import createError from 'http-errors'
import { getAuth } from 'firebase-admin/auth'
import firebase from 'firebase-admin'
import firebaseConfig from '../../config/firebase-config.js'

/**
 * Represents a authenticeToken class.
 */
export class AuthController {
  /**
   * Authenticate a token from firebase.
   *
   * @param {object} req - Express request object.
   * @param {object} res  - Express respons object.
   * @param {Function} next - Express next middleware function.
   */
  async authenticateToken (req, res, next) {
    console.log('-----authenticateToken-----')
    try {
      if (firebase.apps.length === 0) {
        initializeApp({
          credential: cert(firebaseConfig)
        })
      }
      const header = req.headers?.authorization
      if (header !== 'Bearer null' && req.headers?.authorization?.startsWith('Bearer ')) {
        const idToken = req.headers.authorization.split('Bearer ')[1]
        const decodedToken = await getAuth().verifyIdToken(idToken)
        console.log(decodedToken)
        if (decodedToken) {
          req.user = decodedToken.sub
          next()
        }
      }
    } catch (err) {
      let error = err
      if (error.code === 'auth/id-token-expired' || error.code === 'auth/argument-error') {
        console.log('401 in catch-error')
        error = createError(401)
      } else {
        error = createError(500)
      }
      next(error)
    }
  }

  /**
   * Check's if the valid Token's owner is the same as the owner of the data that is requested.
   *
   * @param {object} req - Express request object.
   * @param {object} res  - Express respons object.
   * @param {Function} next - Express next middleware function.
   */
  async authorizeUser (req, res, next) {
    console.log('----authorizeUser----')
    try {
      console.log(req.body.UserId)
      console.log(req.user)
      console.log(req.params.id)
      if (req.body.UserId === req.user || req.params.id === req.user) {
        next()
      } else {
        console.log('403..')
        const err = createError(403)
        next(err)
      }
    } catch (err) {
      console.log('catch 403')
      console.log(err)
      next(err)
    }
  }
}
