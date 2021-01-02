import express from 'express'
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js"

import {errorHandler, notFound} from "./middlewares/errorMiddleware.js";


dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/products', productRouter);
app.use('/api/order', orderRouter);
app.use('/api/users', userRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} `));
