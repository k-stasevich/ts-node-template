import path from 'path';
process.env.NODE_CONFIG_DIR = path.resolve('src', 'config');
import config from 'config';
import { Dialect } from 'sequelize/types';

class SettingsProvider {
  getDatabaseSettings(): DatabaseSettings {
    return config.get<DatabaseSettings>('database');
  }
}

export const settingsProvider = new SettingsProvider();

interface DatabaseSettings {
  dialect: Dialect;
  database: string;
  username: string;
  password: string;
  host: string;
  port: number;
}
