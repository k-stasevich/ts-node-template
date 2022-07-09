import path from 'path';
process.env.NODE_CONFIG_DIR = path.resolve('src', 'config');
import config from 'config';
import { Dialect } from 'sequelize/types';
import { LOG_LEVEL } from '../constants';

class Settings {
  get general() {
    return {
      appName: config.get<string>('appName'),
      nodeEnv: config.get<'development' | 'production'>('nodeEnv'),
      env: config.get<string>('env'),

      logLevel: config.get<LOG_LEVEL>('logLevel'),
    };
  }

  db(): DatabaseSettings {
    return config.get<DatabaseSettings>('database');
  }
}

export const settings = new Settings();

interface DatabaseSettings {
  dialect: Dialect;
  database: string;
  username: string;
  password: string;
  host: string;
  port: number;
}
