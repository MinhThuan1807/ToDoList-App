import express from 'express'
import { taskValidation } from '~/validations/taskValidation'
import { taskController } from '~/controllers/taskController'

const Router = express.Router()

Router.route('/')
  .get(taskController.getAll)
  .post(taskValidation.createNew, taskController.createNew)

export const taskRoute = Router
