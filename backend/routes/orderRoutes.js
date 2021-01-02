import express from 'express'
import {protect} from "../middlewares/authMiddleware.js";
import {addOrderItems} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.route('/').post(protect, addOrderItems);

export default orderRouter;

