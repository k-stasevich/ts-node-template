import { Sequelize } from 'sequelize/types';

import { init as initUserModel } from './models/user';

export class ModelFactory {
  static init(sequelize: Sequelize) {
    // models
    initUserModel(sequelize);

    // relations
  }
}
