import Joi from 'joi'

const createUserSchema = Joi.object({
  message: Joi.string().required(),
  _id: Joi.string().required()
})


export { createUserSchema }