import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { taskValidation } from '~/validations/taskValidation'
import { taskController } from '~/controllers/taskController'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({
      status: 'OK',
      message: 'GET: API get all tasks'
    })
  })
  .post(taskValidation.createNew, taskController.createNew)

export const taskRoute = Router
