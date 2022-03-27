import { NextFunction } from 'express';
import { Req, Res } from '../interfaces';
import { BaseError, createError } from '../utils/errors';

export const globalErrorHandler = (err: Error, req: Req, res: Res, next: NextFunction) => {
  if (err instanceof BaseError) {
    return sendError(res, err);
  }

  const serverError = new createError.InternalServerError({ ...err });
  res.locals.logger.error(err.stack);
  return sendError(res, serverError);
};

const sendError = (res: Res, err: BaseError) => {
  const json = err.toJSON();
  return res.status(json.status).json(json.response);
};
