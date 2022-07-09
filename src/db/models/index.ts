import { modelFactory } from '../modelFactory';
import { UserModel } from './user';

export const models = modelFactory.getModels();

export namespace Model {
  export type User = UserModel;
}
