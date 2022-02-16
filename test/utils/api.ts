import { request } from './request';

export const api = {
  getUsers: () => request.get('/api/v1/users'),
  getUser: (id: string) => request.get(`/api/v1/users/${id}`),
  createUser: () => request.post('/api/v1/users'),
};
