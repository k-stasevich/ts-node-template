import winston from 'winston';
import express from 'express';
import * as uuid from 'uuid';
import { format as utilFormat } from 'util';
import { Req, Res } from '../../interfaces';
import { getLogMeta } from './utils';
import { settings } from '../settings';
import { LOG_LEVEL } from '../../constants';

const SPLAT = Symbol.for('splat');

const levels = {
  [LOG_LEVEL.ERROR]: 0,
  [LOG_LEVEL.WARN]: 1,
  [LOG_LEVEL.INFO]: 2,
  [LOG_LEVEL.HTTP]: 3,
  [LOG_LEVEL.DEBUG]: 4,
};

const level = () => {
  const LOG_LEVEL = settings.get('LOG_LEVEL');

  if (!levels.hasOwnProperty(LOG_LEVEL)) throw new Error(`Unsupported log level "${LOG_LEVEL}"`);

  return LOG_LEVEL;
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf((info) => {
    // @ts-ignore-next-line
    const rest = info[SPLAT] || [];
    const before = `${info.level} ${info.timestamp}`;
    const after = JSON.stringify(getLogMeta({ traceId: info.traceId }));
    return `${before}: ${utilFormat(info.message, ...rest)} ${after}`;
  }),
  winston.format.colorize({ all: true }),
);

export const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports: [
    //  Log it to terminal
    new winston.transports.Console({ format }),
    // Write all logs with importance level of `error` or less to `error.log`
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Write all logs `all.log`
    new winston.transports.File({ filename: 'logs/all.log' }),
  ],
});

export const addLoggerToResMiddleware = (req: Req, res: Res, next: express.NextFunction) => {
  const traceId = uuid.v4();
  res.locals.traceId = traceId;
  res.locals.logger = logger.child({ traceId });
  next();
};
