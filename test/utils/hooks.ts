require('dotenv').config();
import { dbContext } from '../../src/db/dbContext';

beforeAll(async () => {
  await dbContext.connect();
});

afterAll(async () => {
  await dbContext.disconnect();
});
