/* eslint-disable no-useless-catch */
import { userModel } from '~/models/userModel'
import bcryptjs from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (reqBody) => {
  try {
    const existUser = await userModel.findOneByEmail(reqBody.email)
    if (existUser) {
      throw new ApiError(StatusCodes.CONFLICT, 'Email already exists')
    }

    const nameFromEmail = reqBody.email.split('@')[0]
    const newUser = {
      email: reqBody.email,
      username: nameFromEmail,
      password: bcryptjs.hashSync(reqBody.password, 8),
      verifyToken: uuidv4()
    }

    const createdUser = await userModel.createNew(newUser)

    const getNewUser = await userModel.findOneById(createdUser.insertedId)

    return getNewUser
  } catch (error) {
    throw error
  }
}

export const userService = {
  createNew
}
