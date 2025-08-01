import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({
      status: 'OK',
      message: 'GET: API get all tasks'
    })
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({
      status: 'OK',
      message: 'POST: API create a new task'
    })
  })

export const taskRoutes = Router
