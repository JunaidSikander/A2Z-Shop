import express from 'express'
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoutes.js";

import {errorHandler, notFound} from "./middlewares/errorMiddleware.js";
import {authUser} from "./controllers/userController.js";


dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/products', productRouter);
app.use('/api/users', authUser);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} `));
