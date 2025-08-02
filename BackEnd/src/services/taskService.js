/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatter'
import { taskModel } from '~/models/taskModel'

const createNew = async (reqBody) => {
  try {
    const newTask = {
      ...reqBody,
      slug: slugify(reqBody.title)
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
export const taskService = {
  createNew,
  getAll
}
