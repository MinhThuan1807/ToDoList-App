/* eslint-disable no-console */
import express from 'express'
import { env } from '~/config/environment'
import { CONNECT_DB } from '~/config/mongodb'
import { APIs_V1 } from '~/routes/v1/index.js'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
import cors from 'cors'
import { corsOptions } from '~/config/cors'
import session from 'express-session'
import { sessionConfig } from '~/config/session'

const START_SERVER = () => {
  const app = express()

  // Enable req.body json data
  app.use(express.json())

  // Enable CORS
  app.use(cors(corsOptions))

  // Cấu hình session
  app.use(session(sessionConfig))

  // Use APIs v1
  app.use('/v1', APIs_V1)

  app.get('/debug', (req, res) => {
    console.log(req.session) // xem session đang lưu gì
    res.json(req.session)
  })

  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Server is running at http://${env.APP_HOST}:${env.APP_PORT}`)
  })
}

//IIFE to start the server
;(async () => {
  try {
    console.log('1. Connecting to MongoDB...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB successfully!')

    // Start the server
    START_SERVER()
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(0) // Exit the process with failure
  }
})()
