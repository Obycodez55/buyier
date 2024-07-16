import express from 'express';

import IndexRouter from './routes/index';
import { databaseService } from './utils/database';


// Create Express App
const app: express.Express = express();

// Connect to the Database
databaseService.authenticate();

app.set('port', process.env.PORT || 8080);


// Use the Router
app.use('/', IndexRouter);

// Export the Express app
export default app;