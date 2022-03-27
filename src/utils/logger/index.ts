import winston from 'winston';
import express from 'express';
import * as uuid from 'uuid';
import { format as utilFormat } from 'util';
import { Req, Res } from '../../interfaces';
import { getLogMeta } from './utils';

const SPLAT = Symbol.for('splat');

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  // log all levels always
  return 'debug';
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
