import pkgJson from './package.json';
import usersSwagger from './src/routes/users/swagger';

const port = process.env.PORT || 8000;
const server =
  process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
    ? {
        url: `http://localhost:${port}`,
        description: 'development server',
      }
    : {
        url: process.env.SERVER_ENDPOINT,
        description: `${process.env.NODE_ENV} server`,
      };

const swagger = {
  openapi: '3.0.0',
  info: {
    title: 'Sunmait Career Day API',
    version: `${pkgJson.version}`,
    description: 'The REST API',
  },
  servers: [server],
  showExplorer: true,
  components: {
    securitySchemes: {
      UserIdKey: {
        type: 'apiKey',
        in: 'header',
        name: 'userId',
      },
      AuthorizationKey: {
        type: 'apiKey',
        in: 'header',
        name: 'authorization',
      },
    },
  },
  security: [{ AuthorizationKey: [] }, { UserIdKey: [] }],

  paths: {
    ...usersSwagger,
  },
};
export default swagger;
