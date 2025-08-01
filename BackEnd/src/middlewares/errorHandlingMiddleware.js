/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'

export const errorHandlingMiddleware = (err, req, res, next) => {
  // If the developer forgets to set statusCode, default to 500 INTERNAL_SERVER_ERROR
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  // If Build Mode is not 'dev', remove the stack trace from the response
  if (env.BUILD_MODE !== 'dev') delete responseError.stack

  // Create a variable responseError to control the response
  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode],
    stack: err.stack
  }

  res.status(responseError.statusCode).json(responseError)
}
