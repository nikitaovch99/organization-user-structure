import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/userRouter.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
