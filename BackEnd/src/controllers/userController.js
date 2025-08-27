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

const verifyEmail = async (req, res, next) => {
  try {
    const result = await userService.verifyEmail(req.body)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body)

    if (result) {
      req.session.user = { userId: result._id.toString() }
    }
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

const logout = (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return next(
          new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, err.message)
        )
      }
      res.status(StatusCodes.OK).json({ message: 'Logout successful' })
    })
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

export const userController = {
  createNew,
  verifyEmail,
  login,
  logout
}
