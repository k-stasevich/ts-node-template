import express from 'express';
import swaggerUI from 'swagger-ui-express';

import swDocument from '../../swagger';
import { globalErrorHandler } from '../middlewares/globalErrorHandler';
import { addLoggerToResMiddleware } from '../utils/logger';
import logHttpMiddleware from '../utils/logger/morgan';
import { settings } from '../utils/settings';

const apiV1 = '/api/v1';

export default (app: express.Application) => {
  app.use(`/api-docs`, swaggerUI.serve, swaggerUI.setup(swDocument));

  app.use(addLoggerToResMiddleware);
  app.use(logHttpMiddleware);

  // routes
  app.use(`${apiV1}/users`, require('./users').default);
  app.use('/', require('./serverStatus').default);

  if (settings.get('NODE_ENV') === 'development') {
    app.use('/logger', require('./logger').default);
  }

  app.use(globalErrorHandler);
};
