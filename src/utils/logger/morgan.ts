import morgan, { StreamOptions } from 'morgan';
import { logger } from '.';
import { Req, Res } from '../../interfaces';

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
  // Use the http severity
  write: (message: string) => logger.http(message),
};

const morganMiddleware = morgan(
  function (tokens, req: Req, res: Res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify({ traceId: res.locals.traceId }),
    ].join(' ');
  },
  { stream },
);

export default morganMiddleware;
