import { dbContext } from './db/dbContext';
import app from './server';

const port = process.env.PORT || 8000;

Promise.all([dbContext.connect()])
  .then(() => {
    app.listen(port, () => {
      console.info(`Server is started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(`Server is started with error`);
    throw err;
  });
