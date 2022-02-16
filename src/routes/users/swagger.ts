import { swaggerBuilder } from '../../utils/swaggerBuilder';
import schemas from './schema';

const getUsers = {
  summary: 'Get users',
  tags: ['users'],
  parameters: swaggerBuilder.query(schemas.getUsers),
  responses: swaggerBuilder.response(schemas.getUsers),
};
const getUser = {
  summary: 'Get user',
  tags: ['users'],
  parameters: swaggerBuilder.path(schemas.getUser),
  responses: swaggerBuilder.response(schemas.getUser),
};
const createUser = {
  summary: 'Create user',
  tags: ['users'],
  requestBody: swaggerBuilder.body(schemas.createUser),
  responses: swaggerBuilder.response(schemas.createUser),
};

export default {
  '/api/v1/users': {
    get: getUsers,
    post: createUser,
  },
  '/api/v1/users/{id}': {
    get: getUser,
  },
};
