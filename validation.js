const Joi = require('@hapi/joi')

const registerValidation = (data) => {
  const registerSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })
  return registerSchema.validate(data)
}

const loginValidation = (data) => {
  const registerSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })
  return registerSchema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
