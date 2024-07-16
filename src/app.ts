import express from 'express';
import cors from 'cors';
import helmet from 'helmet';


import IndexRouter from './routes/index';
import { databaseService } from './utils/database';
import errorHandler from './utils/middlewares/error-handler';


// Create Express App
const app: express.Express = express();

// Connect to the Database
databaseService.authenticate();

app.set('port', process.env.PORT || 8080);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Use the Router
app.use('/', IndexRouter);

// Use the Error Handling Middleware
app.use(errorHandler)

// Export the Express app
export default app;