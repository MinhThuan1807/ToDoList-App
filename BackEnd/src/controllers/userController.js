import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { userService } from '~/services/userService.js'

const createNew = async (req, res, next) => {
  try {
    const createUser = await userService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createUser)
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

export const userController = {
  createNew
}
