import { initializeApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import firebase from 'firebase-admin'
import firebaseConfig from '../../config/firebase-config.js'
// const json = JSON.parse(await readFile(new URL('../../../server.json', import.meta.url)))

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
        if (decodedToken) {
          console.log(decodedToken.email)
          next()
        } else {
          res.send(403)
        }
      }
    } catch (err) {
      console.log(err.message)
    }
  }
}
