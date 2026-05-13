import * as Joi from 'joi';

export const ENV_VALIDATION_SCHEMA = Joi.object({
  DATABASE_URL: Joi.string().required(),
  PORT: Joi.number().required(),
  TOKEN: Joi.string().required(),
});
