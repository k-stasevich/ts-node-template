import { UserModel } from '../../db/models';
import { UserCreationAttributes } from '../../db/models/user';
import { ArrayResponse, Pagination } from '../../interfaces';

class UserService {
  async getUsers(options: Partial<Pagination> = {}): Promise<ArrayResponse<UserModel>> {
    const { limit = 100, offset = 0 } = options;

    const result = await UserModel.findAndCountAll({
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

  async getUser(options: { id: string }): Promise<UserModel | null> {
    const { id } = options;

    const user = await UserModel.findOne({
      where: { id },
      attributes: ['id', 'name'],
    });

    return user;
  }

  async createUser(data: UserCreationAttributes): Promise<UserModel> {
    const result = await UserModel.create(data);
    return result;
  }
}

export default new UserService();
