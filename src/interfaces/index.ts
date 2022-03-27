import Joi from 'joi';
import express from 'express';
import winston from 'winston';

export interface ArrayResponse<T> {
  results: T[];
  metadata: {
    count: number;
    limit: number;
    offset: number;
  };
}

export interface EndpointSchema {
  params?: Joi.Schema;

  body?: Joi.Schema;

  query?: Joi.Schema;

  response: {
    [status: string]: ResponseEndpointSchema;
  };
}

export interface ResponseEndpointSchema {
  schema: Joi.Schema;
  swaggerOptions?: EndpointSchemaSwaggerOptions;
}

export interface EndpointSchemaSwaggerOptions {
  description?: string;
}

// responsible for locating interfaces with data
// added to `res.locals`
//
// Usage example:
// const controller = (req: Request, res: Response<unknown, ResLocals.AuthenticatedUser>) => {
//   const { userId } = res.locals;
// };
export namespace ResLocals {
  export interface AuthenticatedUser {
    userId: number;
  }

  export interface Base {
    logger: winston.Logger;
  }
}

export type Req = express.Request;

/**
 * Must be used everywhere instead of `express.Response`
 * because this is response object of any request.
 *
 * For example it contains logger as `res.locals.logger`
 */
export type Res<AdditionalLocals = unknown, ResBody = unknown> = express.Response<
  ResBody,
  {
    logger: winston.Logger;
    traceId: string;
  } & AdditionalLocals
>;

export interface Pagination {
  limit: number;
  offset: number;
}
