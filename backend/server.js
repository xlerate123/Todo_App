import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import todoRoutes from './routes/todo.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to mongodb')
        app.listen(PORT, () => console.log(`Server running at port ${PORT}`))
    })
    .catch(err => console.log(err));
