import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const isAuthorized = (req, res, next) => {
  try {
    if (!req.session.user) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized access')
    }
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized access'))
  }
}

export const authHandlingMiddleware = { isAuthorized }
