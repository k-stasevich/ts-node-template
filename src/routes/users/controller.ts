import { NextFunction, Request, Response } from 'express';
import { ResLocals } from '../../interfaces';
import { createError } from '../../utils/errors';
import userService from './service';

class UsersController {
  async getUsers(req: Request, res: Response<unknown, ResLocals.AuthenticatedUser>): Promise<void> {
    const result = await userService.getUsers();

    res.status(200).json(result);
  }

  async getUser(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req: Request<{ id: string }>,
    res: Response<unknown, ResLocals.AuthenticatedUser>,
  ): Promise<void> {
    const { id } = req.params;

    const result = await userService.getUser({ id });

    if (!result) throw new createError.NotFound();

    res.status(200).json(result);
  }

  async createUser(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req: Request<any, any, CreateUserBody>,
    res: Response<unknown, ResLocals.AuthenticatedUser>,
    next: NextFunction,
  ): Promise<void> {
    const { name } = req.body;

    const result = await userService.createUser({ name });

    res.status(200).json(result);
  }
}

export default new UsersController();

interface CreateUserBody {
  name: string;
}
