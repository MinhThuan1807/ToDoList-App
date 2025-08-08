import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validator'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'

// Define the sachema for (name & Schema)
const TASK_NAME = 'task'
const TASK_COLLECTION_SCHEMA = Joi.object({
  userId: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(100).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().optional().allow('').max(500).trim().strict(),
  status: Joi.boolean().default(false),
  dueDate: Joi.date().optional().default(null),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const validateBeforeCreate = async (data) => {
  return await TASK_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const createNew = async (data) => {
  try {
    // Validate the data before inserting
    const validData = await validateBeforeCreate(data)
    // console.log('Validated Data:', validData)

    // Get the database instance
    // Convert userId to ObjectId before inserting
    validData.userId = new ObjectId(validData.userId)

    const createTask = await GET_DB().collection(TASK_NAME).insertOne(validData)

    return createTask
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const result = await GET_DB()
      .collection(TASK_NAME)
      .findOne({ _id: new ObjectId(id) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getAll = async () => {
  try {
    const tasks = await GET_DB().collection(TASK_NAME).find().toArray()

    return tasks
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (taskId, updateData) => {
  try {
    // Filter out invalid fields
    Object.keys(updateData).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
        delete updateData[fieldName]
      }
    })

    const result = await GET_DB()
      .collection(TASK_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(taskId) },
        { $set: updateData },
        { returnDocument: 'after' } // Return the updated document
      )

    return result
  } catch (error) {
    throw new Error(error)
  }
}

const deleteOneById = async (taskId) => {
  try {
    const result = await GET_DB()
      .collection(TASK_NAME)
      .deleteOne({ _id: new ObjectId(taskId) })

    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const taskModel = {
  TASK_NAME,
  TASK_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getAll,
  update,
  deleteOneById
}
