import path from 'path';
process.env.NODE_CONFIG_DIR = path.resolve('src', 'config');
import config from 'config';
import { Dialect } from 'sequelize/types';

class Settings {
  get main() {
    return {
      appName: config.get<string>('appName'),
      nodeEnv: config.get<'development' | 'production'>('nodeEnv'),
      env: config.get<string>('env'),
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
