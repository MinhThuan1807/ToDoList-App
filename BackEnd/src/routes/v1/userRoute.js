import express from 'express'
import { userValidation } from '~/validations/userValidation'
import { userController } from '~/controllers/userController.js'

const Router = express.Router()

Router.route('/register').post(
  userValidation.createNew,
  userController.createNew
)

Router.route('/login').post(userValidation.login, userController.login)

Router.route('/logout').delete(userController.logout)

Router.route('/verify').put(
  userValidation.verifyEmail,
  userController.verifyEmail
)

export const userRouter = Router
