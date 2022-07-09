import { Sequelize } from 'sequelize';
import { settings } from '../utils/settings';
import { modelFactory } from './modelFactory';

class DbContext {
  private _sequelize: Sequelize;

  constructor() {
    const dbConfig = settings.db();
    this._sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect,
      logging: false,
    });
    modelFactory.init(this._sequelize);
  }

  public async connect(): Promise<void> {
    await this._sequelize.authenticate();
  }

  public async disconnect(): Promise<void> {
    await this._sequelize.close();
  }
}

export const dbContext = new DbContext();
