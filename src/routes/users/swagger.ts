import { swaggerBuilder } from '../../utils/swaggerBuilder';
import schemas from './schema';

const getUsers = {
  summary: 'Get users',
  tags: ['users'],
  parameters: swaggerBuilder.query(schemas.getUsers),
  responses: swaggerBuilder.response(schemas.getUsers.response),
};

export default {
  '/api/v1/users': {
    get: getUsers,
  },
};
