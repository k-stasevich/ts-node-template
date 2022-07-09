import { Sequelize } from 'sequelize/types';

import { init as initUserEntity } from './models/user';

export class InitEntities {
  static init(sequelize: Sequelize) {
    // models
    initUserEntity(sequelize);

    // relations
  }
}
