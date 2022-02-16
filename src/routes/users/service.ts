import { UserEntity } from '../../db/entities';
import { UserCreationAttributes } from '../../db/entities/userEntity';
import { ArrayResponse, Pagination } from '../../interfaces';

class UserService {
  async getUsers(options: Partial<Pagination> = {}): Promise<ArrayResponse<UserEntity>> {
    const { limit = 100, offset = 0 } = options;

    const result = await UserEntity.findAndCountAll({
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

  async getUser(options: { id: string }): Promise<UserEntity | null> {
    const { id } = options;

    const user = await UserEntity.findOne({
      where: { id },
      attributes: ['id', 'name'],
    });

    return user;
  }

  async createUser(data: UserCreationAttributes): Promise<UserEntity> {
    const result = await UserEntity.create(data);
    return result;
  }
}

export default new UserService();
