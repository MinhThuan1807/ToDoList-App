/* eslint-disable no-console */
import express from 'express'
import { env } from '~/config/environment'
import { CONNECT_DB } from '~/config/mongodb'
import { APIs_V1 } from '~/routes/v1/index.js'

const START_SERVER = () => {
  const app = express()

  app.get('/', (req, res) => {
    res.send(`Welcome to the ToDo List App! Author: ${env.AUTHOR_NAME}`)
  })

  app.use('/v1', APIs_V1)

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
