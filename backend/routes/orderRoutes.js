import express from 'express'
import {protect} from "../middlewares/authMiddleware.js";
import {addOrderItems, getOrderById, updateOrderToPaid} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.route('/').post(protect, addOrderItems);
orderRouter.route('/:id').get(protect, getOrderById);
orderRouter.route('/:id/pay').put(protect, updateOrderToPaid);

export default orderRouter;

