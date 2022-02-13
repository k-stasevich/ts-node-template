import { UserEntity } from '../../db/entities';
import { ArrayResponse, Pagination } from '../../interfaces';

class UserService {
  async getUsers(options: Partial<Pagination> = {}): Promise<ArrayResponse<UserEntity>> {
    const { limit = 10, offset = 0 } = options;

    return {
      results: [],
      metadata: {
        count: 100,
        limit,
        offset,
      },
    };
  }
}

export default new UserService();
