import { StatusCodes } from 'http-status-codes'

const createNew = (req, res, next) => {
  try {
    // Redirect data to the service layer

    // Resulte response for client
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'POST from Controller: API create new task' })
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: error.message
    })
  }
}
export const taskController = {
  createNew
}
