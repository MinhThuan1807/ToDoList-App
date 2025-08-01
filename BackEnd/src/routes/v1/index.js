import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { taskRoutes } from './taskRoutes.js'

const Router = express.Router()

// Check APIs v1/status
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({
    status: 'OK',
    message: 'API v1 is running smoothly!'
  })
})

// Register task routes
Router.use('/tasks', taskRoutes)

export const APIs_V1 = Router
