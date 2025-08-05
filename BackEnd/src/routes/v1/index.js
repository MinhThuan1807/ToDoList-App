import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { taskRoute } from './taskRoute.js'
import { userRouter } from './userRoute.js'

const Router = express.Router()

// Check APIs v1/status
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({
    status: 'OK',
    message: 'API v1 is running smoothly!'
  })
})

// Register task routes
Router.use('/tasks', taskRoute)

// Register user routes
Router.use('/users', userRouter)

export const APIs_V1 = Router
