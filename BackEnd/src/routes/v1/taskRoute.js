import express from 'express'
import { taskValidation } from '~/validations/taskValidation'
import { taskController } from '~/controllers/taskController'
import { authHandlingMiddleware } from '~/middlewares/authHandlingMiddleware'

const Router = express.Router()

Router.route('/')
  .get(authHandlingMiddleware.isAuthorized, taskController.getAll)
  .post(
    authHandlingMiddleware.isAuthorized,
    taskValidation.createNew,
    taskController.createNew
  )

Router.route('/:id')
  .get(authHandlingMiddleware.isAuthorized, taskController.getDetail)
  .put(
    authHandlingMiddleware.isAuthorized,
    taskValidation.update,
    taskController.update
  )
  .patch(
    authHandlingMiddleware.isAuthorized,
    taskValidation.update,
    taskController.update
  )
  .delete(
    authHandlingMiddleware.isAuthorized,
    taskValidation.deleteItem,
    taskController.deleteTask
  )

Router.route('/user/:userId').get(
  authHandlingMiddleware.isAuthorized,
  taskController.getAllTasksByUserId
)

export const taskRoute = Router
