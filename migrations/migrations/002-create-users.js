'use strict';

const { withMigration } = require('../utils');

const TABLE_NAME = 'Users';
const DB_SCHEMA = process.env.DB_SCHEMA;
const target = { tableName: TABLE_NAME, schema: DB_SCHEMA };

module.exports = {
  up: withMigration((queryInterface, DataTypes, transaction) => {
    return queryInterface.createTable(
      target,
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.literal('uuid_generate_v4()'),
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      },
      { transaction },
    );
  }),
  down: withMigration((queryInterface, DataTypes, transaction) => {
    return queryInterface.dropTable(target);
  }),
};
