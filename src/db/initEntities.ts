import { Sequelize } from 'sequelize/types';

import { init as initUserEntity } from './entities/userEntity';

export class InitEntities {
  static init(sequelize: Sequelize) {
    // models
    initUserEntity(sequelize);

    // relations
  }
}
