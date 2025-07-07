import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import usersRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoute';

import quizRoute from './routes/quizRoute'
import { errorHandler } from './middleware/errorHandler';


//swagger
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
// import  blogRoutes from './routes/blogRoutes';

dotenv.config();
const app = express();

//Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

// Routes

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);

app.use('/quiz',quizRoute)

// Error handling middleware
app.use(errorHandler);

//app.use('/api/blogs', blogRoutes);

const PORT = process.env.PORT || 5000;
sequelize.sync({force:true}).then(() => {
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});