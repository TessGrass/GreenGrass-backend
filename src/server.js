import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import { router } from './routes/router.js'
import { connectDB } from './config/mongoose.js'
import cors from 'cors'

try {
  await connectDB()

  const app = express()

  app.use(cors())

  app.use(helmet())

  app.use(logger('dev'))

  app.use(express.json()) // express.json() is a built in middleware function in Express starting from v4.16.0. It parses incoming JSON requests and puts the parsed data in req.body. Without this req.body is undefined.

  app.use('/', router)
  app.use(function (err, req, res, next) {
    if (err.status === 400) {
      res.status(400).json({ status_code: 400, message: 'The request cannot or will not be processed due to something that is perceived to be a client error (for example, validation error).' })
    } else if (err.status === 401) {
      res.status(401).json({ status_code: 401, message: 'Access token invalid or not provided.' })
    } else if (err.status === 403) {
      res.status(403).json({ status_code: 403, message: 'The request contained valid data and was understood by the server, but the server is refusing action due to the authenticated user not having the necessary permissions for the resource.' })
    } else if (err.status === 404) {
      res.status(404).json({ status_code: 404, message: 'The requested resource was not found.' })
    } else if (err.status || err.status === 500) {
      res.status(500).json({ status_code: 500, message: 'An unexpected condition was encountered.' })
    }

    if (req.app.get('env') !== 'development') {
      return res
        .status(err.status)
        .json({
          status: err.status,
          message: err.message
        })
    }
  })

  // Starts the HTTP server listening for connections.
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
} catch (err) {
  console.error(err)
  process.exitCode = 1
}
