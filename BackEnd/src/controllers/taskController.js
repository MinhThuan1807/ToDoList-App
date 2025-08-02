import { StatusCodes } from 'http-status-codes'
import { taskService } from '~/services/taskService.js'

const createNew = async (req, res, next) => {
  try {
    // Redirect data to the service layer
    const createTask = await taskService.createNew(req.body)

    // Result response for client
    res.status(StatusCodes.CREATED).json(createTask)
  } catch (error) {
    next(error) // Pass the error to the error handling middleware
  }
}
const getAll = async (req, res, next) => {
  try {
    const tasks = await taskService.getAll()

    res.status(StatusCodes.OK).json(tasks)
  } catch (error) {
    next(error)
  }
}
export const taskController = {
  createNew,
  getAll
}
