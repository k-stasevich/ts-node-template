import { settings } from '../settings';

export const getLogMeta = (options: { traceId: string }) => ({
  traceId: options.traceId,
  app: settings.general.appName,
  env: settings.general.env,
});
