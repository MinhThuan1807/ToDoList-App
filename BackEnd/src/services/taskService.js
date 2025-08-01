/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatter'
const createNew = async (reqBody) => {
  try {
    const newTask = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Return the newly created task
    return newTask
  } catch (error) {
    throw error
  }
}
export const taskService = {
  createNew
}
