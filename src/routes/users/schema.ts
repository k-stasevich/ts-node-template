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

const getUserSchema: EndpointSchema = {
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  response: {
    200: {
      schema: Joi.object({
        id: Joi.string().uuid(),
        name: Joi.string(),
      })
        .example({
          id: faker.datatype.uuid(),
          name: faker.name.findName(),
        })
        .allow(null),
      swaggerOptions: {
        description: 'Get user',
      },
    },

    404: buildResponse(schemaErrorExample.notFound()),
    422: buildResponse(schemaErrorExample.unprocessableEntity(RESPONSE_CODE.VALIDATION_ERROR)),
    500: buildResponse(schemaErrorExample.internalServerError()),
  },
};

const createUserSchema: EndpointSchema = {
  body: Joi.object({
    name: Joi.string().required(),
  }).example({
    name: faker.name.findName(),
  }),

  response: {
    200: {
      schema: Joi.object({
        id: Joi.string().uuid(),
        name: Joi.string(),
      }).example({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
      }),
      swaggerOptions: {
        description: 'Create user',
      },
    },

    422: buildResponse(schemaErrorExample.unprocessableEntity(RESPONSE_CODE.VALIDATION_ERROR)),
    500: buildResponse(schemaErrorExample.internalServerError()),
  },
};

export default {
  getUsers: getUsersSchema,
  getUser: getUserSchema,
  createUser: createUserSchema,
};
