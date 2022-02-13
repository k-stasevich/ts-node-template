import { Request, Response } from 'express';
import { ResponseLocals } from '../../interfaces';
import userService from './service';

class UsersController {
  async getUsers(
    req: Request,
    res: Response<unknown, ResponseLocals.AuthenticatedUser>,
  ): Promise<void> {
    const result = await userService.getUsers();

    res.status(200).json(result);
  }
}

export default new UsersController();
