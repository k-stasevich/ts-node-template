import Joi from 'joi';
import { createError } from './errors';
import { swaggerBuilder } from './swaggerBuilder';

export const buildResponse = (example: object | object[]) => {
  return swaggerBuilder.errorResponse(Joi.any().example(example));
};

export const schemaErrorExample = {
  unprocessableEntity(code: string, data?: object) {
    const error = new createError.UnprocessableEntity({ code, data });
    return error.toJSON().response;
  },

  internalServerError() {
    const error = new createError.InternalServerError();
    return error.toJSON().response;
  },
};
