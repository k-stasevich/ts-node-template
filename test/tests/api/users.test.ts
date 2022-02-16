import '../../utils/hooks';

import { reapplyMigrations } from '../../utils/migrations';
import { api } from '../../utils/api';
import { testFactories } from '../../factories/index';
import faker from '@faker-js/faker';

describe('API /users', () => {
  beforeEach(async () => {
    await reapplyMigrations();
  });

  describe('GET /api/v1/users', () => {
    it('should get users', async () => {
      // creating some users
      const [createResponse1, createResponse2, createResponse3] = await Promise.all([
        testFactories.user.create(),
        testFactories.user.create(),
        testFactories.user.create(),
      ]);

      const res = await api.getUsers();

      expect(res.body.results.find((i) => i.id === createResponse1.body.id)).toBeTruthy();
      expect(res.body.results.find((i) => i.id === createResponse2.body.id)).toBeTruthy();
      expect(res.body.results.find((i) => i.id === createResponse3.body.id)).toBeTruthy();
    });
  });

  describe('POST /api/v1/users', () => {
    it('should create user', async () => {
      const body = { name: faker.name.findName() };
      let res = await api.createUser().send(body);
      expect(res.status).toEqual(200);

      res = await api.getUser(res.body.id);
      expect(res.status).toEqual(200);
    });

    it('cannot create user without name', async () => {
      const body = {};
      const res = await api.createUser().send(body);
      expect(res.status).toEqual(422);
      expect(res.body.errors[0].message).toEqual('"name" is required');
    });
  });
});
