import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
const app = express();
app.use(logger);
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_DOMAIN,
    credentials: true,
    methods: 'GET,PATCH,POST,PUT,DELETE',
  }),
);
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

app.use(authRoutes);
app.use(notesRoutes);
app.use(userRoutes);
app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
