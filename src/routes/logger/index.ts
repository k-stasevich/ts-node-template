import express from 'express';
import { Res, ResLocals } from '../../interfaces';

const router = express.Router();

router.get('/', (req: express.Request, res: Res<ResLocals.AuthenticatedUser>) => {
  const { logger } = res.locals;

  logger.error('This is an error log', { level: 0 });
  logger.warn('This is a warn log', { level: 1 });
  logger.info('This is a info log', { level: 2 });
  logger.http('This is a http log', { level: 3 });
  logger.debug('This is a debug log', { level: 4 });

  res.json('logged');
});

export default router;
