import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validator'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(100).trim().strict().message({
      'any.required': 'Title is required',
      'string.empty': 'Title cannot be empty',
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title must not exceed 100 characters',
      'string.trim': 'Title cannot have leading or trailing spaces'
    }),
    description: Joi.string()
      .optional()
      .allow('')
      .max(500)
      .trim()
      .strict()
      .message({
        'string.max': 'Description must not exceed 500 characters',
        'string.trim': 'Description cannot have leading or trailing spaces'
      }),
    status: Joi.boolean().default(false),
    dueDate: Joi.date().optional().default(null)
  })
  try {
    // abortEarly: false allows all validation errors to be returned at once
    await correctCondition.validateAsync(req.body, { abortEarly: false })

    // If validation passes, proceed to the next controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(100).trim().strict().message({
      'any.required': 'Title is required',
      'string.empty': 'Title cannot be empty',
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title must not exceed 100 characters',
      'string.trim': 'Title cannot have leading or trailing spaces'
    }),
    description: Joi.string()
      .optional()
      .allow('')
      .max(500)
      .trim()
      .strict()
      .message({
        'string.max': 'Description must not exceed 500 characters',
        'string.trim': 'Description cannot have leading or trailing spaces'
      }),
    status: Joi.boolean().default(false),
    dueDate: Joi.date().optional()
  })
  try {
    // abortEarly: false allows all validation errors to be returned at once
    // allowUnknown: true allows additional fields not specified in the schema
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    })

    // If validation passes, proceed to the next controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

const deleteItem = async (req, res, next) => {
  const correctCondition = Joi.object({
    id: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE)
  })
  try {
    await correctCondition.validateAsync(req.params)

    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

export const taskValidation = {
  createNew,
  update,
  deleteItem
}
