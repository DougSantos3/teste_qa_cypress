import Joi from 'joi'

const loginSchema = Joi.object({
  message: Joi.string().required(),
  authorization: Joi.string().required()
})


export { loginSchema }