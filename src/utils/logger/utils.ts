import { settings } from '../settings';

export const getLogMeta = (options: { traceId: string }) => ({
  traceId: options.traceId,
  app: settings.general.APP_NAME,
  env: settings.general.ENV,
});
