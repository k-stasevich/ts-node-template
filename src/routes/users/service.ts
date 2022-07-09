import { CreationAttributes } from 'sequelize/types';
import { Model, models } from '../../db/models';
import { ArrayResponse, Pagination } from '../../interfaces';

class UserService {
  async getUsers(options: Partial<Pagination> = {}): Promise<ArrayResponse<Model.User>> {
    const { limit = 100, offset = 0 } = options;

    const result = await models.User.findAndCountAll({
      limit,
      offset,
      attributes: ['id', 'name'],
    });

    return {
      results: result.rows,
      metadata: {
        count: result.count,
        limit,
        offset,
      },
    };
  }

  async getUser(options: { id: string }): Promise<Model.User | null> {
    const { id } = options;

    const user = await models.User.findOne({
      where: { id },
      attributes: ['id', 'name'],
    });

    return user;
  }

  async createUser(data: CreationAttributes<Model.User>): Promise<Model.User> {
    const result = await models.User.create(data);
    return result;
  }
}

export default new UserService();
