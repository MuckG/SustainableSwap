import express from 'express';
import router from './config/router.js';
import { connectDb } from './db/helpers.js';
import { PORT } from './config/environment.js';

const app = express();

app.use(express.json());
app.use('/', router);

async function startServer() {
  try {
    await connectDb();
    console.log("Successfully connected to database");

    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(`Something went wrong: ${err}`);
  }
}

startServer();