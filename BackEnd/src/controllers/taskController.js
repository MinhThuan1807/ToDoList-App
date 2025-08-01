import { StatusCodes } from 'http-status-codes'

const createNew = (req, res, next) => {
  try {
    // Redirect data to the service layer

    // Resulte response for client
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'POST from Controller: API create new task' })
  } catch (error) {
    next(error) // Pass the error to the error handling middleware
  }
}
export const taskController = {
  createNew
}
