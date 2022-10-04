import * as Joi from 'joi';

export const LoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()

});

export const RegisterUserSchema = Joi.object({
    nickname: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(3).required(),
    lastname: Joi.string().required(),
    phone: Joi.string(),

})