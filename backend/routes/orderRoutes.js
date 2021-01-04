import express from 'express'
import {protect} from "../middlewares/authMiddleware.js";
import {addOrderItems, getMyOrders, getOrderById, updateOrderToPaid} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.route('/').post(protect, addOrderItems);
orderRouter.route('/myorders').get(protect, getMyOrders);
orderRouter.route('/:id').get(protect, getOrderById);
orderRouter.route('/:id/pay').put(protect, updateOrderToPaid);

export default orderRouter;

