import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { routes } from './routes';
const app = express();
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);
export default app;
