import { ModelStatic, Sequelize } from 'sequelize/types';

import { init as initUserModel, UserModel } from './models/user';

class ModelFactory {
  private models!: {
    User: ModelStatic<UserModel>;
  };

  init(sequelize: Sequelize) {
    // models
    const User = initUserModel(sequelize);

    // relations

    this.models = {
      User,
    };
  }

  getModels() {
    return this.models;
  }
}

export const modelFactory = new ModelFactory();
