import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

export interface UserAttributes {
  id: number;
  name: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'name'> {}

export class UserEntity
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  id!: number;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export const init = (sequelize: Sequelize) => {
  UserEntity.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
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
