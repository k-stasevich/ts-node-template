import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';

export interface UserAttributes {
  id: number;
  name: string;
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

export class UserModel
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  id!: number;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export const init = (sequelize: Sequelize) => {
  UserModel.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'Users',
      sequelize,
      schema: process.env.DB_SCHEMA,
    },
  );
};
