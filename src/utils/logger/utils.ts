import { settings } from '../settings';

export const getLogMeta = (options: { traceId: string }) => ({
  traceId: options.traceId,
  app: settings.main.appName,
  env: settings.main.env,
});
