todo:

- GET single user endpoint example
- PATCH endpoint example
- DELETE endpoint example

# Sunmait Career Day backend

## API Docs

http://localhost:3000/api/v1/api-docs/

## Setup development

```bash
# required node >= 16

cp .env.sample .env         # Make local .env file from sample
npm i                       # Install dependencies
npm run compose             # Start server dependencies (database, .etc)
npm run migrate             # Run database migrations
npm run dev                 # Start server
```

## Run tests

```bash
npm test
```

## Architecture

### File naming

All files in camelCase. Exception - migrations(snake_case)

### Backend architecture

Basic layered architecture of most endpoints is handled with following structure

```bash
# Required. Registers controller and middlewares
src/routes/<endpoints_folder>/index.ts
# Required. Controller
src/routes/<endpoints_folder>/controller.ts
# Required. Service
src/routes/<endpoints_folder>/service.ts
# Required. Schema
src/routes/<endpoints_folder>/schema.ts
# Required. Swagger (API doc)
src/routes/<endpoints_folder>/swagger.ts
# Optional. May be created to locate helpers that are needed
# only inside for these endpoint (to not overload src/utils folder)
src/routes/<endpoints_folder>/utils.ts
```

- **Controller** level:
  - responsible for:
    - parsing/mapping request params if needed
    - calling service method (more than one if needed)
    - handling errors from services to respond with proper http status
  - cannot do db operations (cannot use ORM entities)
- **Service** level:
  - responsible for:
    - business logic
    - operations with DB (using ORM entities)
    - throwing errors that will be catched by controller/middlewares to send http response
  - services shouldn't use `req`, `res`, `next` params - this is responsibility of **controller** level to pass data from request object to service
- **Utils**:
  - contains any reusable utility code
  - If there's clear domain of some utilities to combine - create new file in `src/utils` folder, otherwise - locate this code in `src/utils/index.ts`

### Backend architecture edge cases

1. In case there's service logic that need to be reused in other controllers/services it should be located in `src/services` folder

### Typescript interfaces

1. Don't
2. If interface/type is needed only for this specific file and nowhere else - put it on the bottom of file
   1. don't export it to not overload autoimport's autocomplete
3. If interface/type is reusable - locate it in `src/interaces/index.ts`
   1. Yes, it will be a mess of interfaces. If there's clear domain of some interfaces - create separate file for it in `src/interfaces` folder, otherwise don't create new file for a single interface - mess of interfaces in `src/interfaces/index.ts` is better than mess of million of small files in `src/interfaces` folder
