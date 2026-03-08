import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { routes } from './routes';

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: false, 
  })
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api', routes);

export default app;
