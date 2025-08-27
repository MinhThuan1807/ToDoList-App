/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatter'
import { taskModel } from '~/models/taskModel'
import { userModel } from '~/models/userModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (reqBody) => {
  try {
    const newTask = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    if (!(await userModel.findOneById(newTask.userId))) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `User with ID ${newTask.userId} not found`
      )
    }

    // Call to model layer to create a new task
    const createdTask = await taskModel.createNew(newTask)

    // Get the created task by its ID
    const getNewTask = await taskModel.findOneById(createdTask.insertedId)

    // Return the newly created task
    return getNewTask
  } catch (error) {
    throw error
  }
}

const getAll = async () => {
  try {
    const tasks = await taskModel.getAll()

    return tasks
  } catch (error) {
    throw error
  }
}

const getDetail = async (taskId) => {
  try {
    const task = await taskModel.findOneById(taskId)
    if (!task) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `Task with ID ${taskId} not found`
      )
    }
    // Return the task details
    return task
  } catch (error) {
    throw error
  }
}

const update = async (taskId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedTask = await taskModel.update(taskId, updateData)

    // Return the updated task
    return updatedTask
  } catch (error) {
    throw error
  }
}

const deleteTask = async (taskId) => {
  try {
    const task = await taskModel.findOneById(taskId)

    if (!task) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `Task with ID ${taskId} not found`
      )
    }

    // Call to model layer to delete the task
    await taskModel.deleteOneById(taskId)

    return { deleteResult: 'Task deleted successfully' }
  } catch (error) {
    throw error
  }
}

const getAllTasksByUserId = async (userId) => {
  try {
    const tasks = await taskModel.findAllByUserId(userId)
    if (!tasks || tasks.length === 0) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `No tasks found for user with ID ${userId}`
      )
    }

    return tasks
  } catch (error) {
    throw error
  }
}

export const taskService = {
  createNew,
  getAll,
  getDetail,
  update,
  deleteTask,
  getAllTasksByUserId
}
