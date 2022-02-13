import Joi from 'joi';

export const getArrayResponseExample = (
  itemSchema: Joi.Schema,
  itemExample: object,
): Joi.Schema => {
  //
  return Joi.object({
    results: Joi.array().items(itemSchema),
    metadata: {
      count: Joi.number().integer(),
      limit: Joi.number().integer(),
      offset: Joi.number().integer(),
    },
  }).example({
    results: [itemExample],
    metadata: {
      count: 100,
      limit: 10,
      offset: 0,
    },
  });
};
