import path from 'path';
process.env.NODE_CONFIG_DIR = path.resolve('src', 'config');
import config from 'config';
import { Dialect } from 'sequelize/types';
import { LOG_LEVEL } from '../constants';

class Settings {
  get(name: 'APP_NAME'): string;
  get(name: 'ENV'): string;
  get(name: 'NODE_ENV'): 'development' | 'production';
  // logging
  get(name: 'LOG_LEVEL'): LOG_LEVEL;
  // Database
  get(name: 'DATABASE'): DatabaseSettings;
  get(name: string): never {
    return config.get(name);
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
