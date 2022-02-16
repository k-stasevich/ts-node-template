import faker from '@faker-js/faker';
import { api } from '../utils/api';

// Test factories responsible for creation of entities to make writing tests easier.
//
// For example to test GET /users there'are users in the database (to get something you need to create something).
// So easy creation may be done It's test scenario responsibility to create all necessary data to test

interface CreateUserPayload {
  name: string;
}
export const createUserPayload = (
  overrides: Partial<CreateUserPayload> = {},
): CreateUserPayload => {
  return { name: faker.name.findName(), ...overrides };
};

export const createUser = async (overrides: Partial<CreateUserPayload> = {}) => {
  const payload = createUserPayload(overrides);
  const res = await api.createUser().send(payload);
  expect(res.status).toBe(200);
  return res;
};

export const testFactories = {
  user: { create: createUser, createPayload: createUserPayload },
};
