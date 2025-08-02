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

const getDetail = async (req, res, next) => {
  try {
    const taskId = req.params.id

    const task = await taskService.getDetail(taskId)

    res.status(StatusCodes.OK).json(task)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const taskId = req.params.id
    const updatedTask = await taskService.update(taskId, req.body)

    res.status(StatusCodes.OK).json(updatedTask)
  } catch (error) {
    next(error)
  }
}

const deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id
    await taskService.deleteTask(taskId)

    res.status(StatusCodes.OK).json({ message: 'Task deleted successfully' })
  } catch (error) {
    next(error)
  }
}

export const taskController = {
  createNew,
  getAll,
  getDetail,
  update,
  deleteTask
}
