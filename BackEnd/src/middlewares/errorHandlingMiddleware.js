/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes'

export const errorHandlingMiddleware = (err, req, res, next) => {
  // If the developer forgets to set statusCode, default to 500 INTERNAL_SERVER_ERROR
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  // Create a variable responseError to control the response
  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode],
    stack: err.stack
  }

  res.status(responseError.statusCode).json(responseError)
}
