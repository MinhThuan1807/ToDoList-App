import express from 'express'
import { taskValidation } from '~/validations/taskValidation'
import { taskController } from '~/controllers/taskController'

const Router = express.Router()

Router.route('/')
  .get(taskController.getAll)
  .post(taskValidation.createNew, taskController.createNew)

Router.route('/:id')
  .get(taskController.getDetail)
  .put(taskValidation.update, taskController.update)
  .delete(taskValidation.deleteItem, taskController.deleteTask)

export const taskRoute = Router
