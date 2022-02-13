import Joi from 'joi';
import faker from '@faker-js/faker';
import { EndpointSchema } from '../../interfaces';
import { buildResponse, schemaErrorExample } from '../../utils/schemaResponseExamples';
import { getArrayResponseExample } from '../../utils/schema';
import { RESPONSE_CODE } from '../../constants';

const getUsersSchema: EndpointSchema = {
  query: Joi.object({
    id: Joi.array().items(Joi.string().uuid()),
    limit: Joi.number().integer(),
    offset: Joi.number().integer(),
  }).example({
    id: faker.datatype.uuid(),
    limit: 10,
    offset: 0,
  }),
  response: {
    200: {
      schema: getArrayResponseExample(
        Joi.object({
          id: Joi.string().uuid(),
          name: Joi.string(),
        }),
        {
          id: faker.datatype.uuid(),
          name: faker.name.findName(),
        },
      ),
      swaggerOptions: {
        description: 'Get users',
      },
    },

    422: buildResponse(schemaErrorExample.unprocessableEntity(RESPONSE_CODE.VALIDATION_ERROR)),
    500: buildResponse(schemaErrorExample.internalServerError()),
  },
};

export default {
  getUsers: getUsersSchema,
};
