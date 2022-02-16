import express from 'express';
import swaggerUI from 'swagger-ui-express';

import users from './users';
import serverStatus from './serverStatus';
import swDocument from '../../swagger.def';
import { globalErrorHandler } from '../middlewares/globalErrorHandler';

const apiV1 = '/api/v1';

export default (app: express.Application) => {
  app.use(`${apiV1}/users`, users);
  app.use(`${apiV1}/api-docs`, swaggerUI.serve, swaggerUI.setup(swDocument));
  app.use('/', serverStatus);
  app.use(globalErrorHandler);
};
