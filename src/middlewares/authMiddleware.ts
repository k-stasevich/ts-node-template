import express from 'express';
import { createError } from '../utils/errors';

export const authMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // stub
  const isAuthenticated = true;

  if (isAuthenticated) {
    res.locals.userId = 1;
    next();
  } else {
    throw new createError.Unauthenticated();
  }
};
