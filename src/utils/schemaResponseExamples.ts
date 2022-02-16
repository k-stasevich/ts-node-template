import Joi from 'joi';
import { createError } from './errors';
import { swaggerBuilder } from './swaggerBuilder';

export const buildResponse = (example: object | object[]) => {
  return swaggerBuilder.errorResponse(Joi.any().example(example));
};

export const schemaErrorExample = {
  notFound() {
    return new createError.NotFound().toJSON().response;
  },

  unprocessableEntity(code: string, data?: object) {
    return new createError.UnprocessableEntity({ code, data }).toJSON().response;
  },

  internalServerError() {
    return new createError.InternalServerError().toJSON().response;
  },
};
