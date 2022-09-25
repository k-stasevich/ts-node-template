import { settings } from '../settings';

export const getLogMeta = (options: { traceId: string }) => ({
  traceId: options.traceId,
  app: settings.get('APP_NAME'),
  env: settings.get('ENV'),
});
