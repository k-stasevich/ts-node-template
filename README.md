todo:

- architecture
- setup precommit hooks
- db
- tests
- swagger

# Sunmait Career Day backend

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
