import { Sequelize } from 'sequelize';
import { settingsProvider } from '../utils/settingsProvider';
import { InitEntities } from './initEntities';

class DbContext {
  private _sequelize: Sequelize;

  constructor() {
    const settings = settingsProvider.getDatabaseSettings();
    this._sequelize = new Sequelize(settings.database, settings.username, settings.password, {
      host: settings.host,
      port: settings.port,
      dialect: settings.dialect,
      logging: false,
    });
    InitEntities.init(this._sequelize);
  }

  public async connect(): Promise<void> {
    await this._sequelize.authenticate();
  }

  public async disconnect(): Promise<void> {
    await this._sequelize.close();
  }
}

export const dbContext = new DbContext();
