import Joi from 'joi'


export const allUserSchema = Joi.object({
  quantidade: Joi.number().integer().min(0).required(),
  usuarios: Joi.array().items(Joi.object({})).min(0).required()
})
