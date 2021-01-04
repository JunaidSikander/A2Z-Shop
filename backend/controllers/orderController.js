import asyncHandler from 'express-async-handler'
import Order from "../models/orderModel.js";


//@desc     Create new Order
//@route    GET /api/order
//@access   Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice} = req.body;
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order Items');

    } else {
        const order = new Order({
            user: req.user._id,
            shippingAddress,
            orderItems,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }

});

//@desc     Get Order by Id
//@route    GET /api/order/:id
//@access   Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order)
        res.json(order);
    else {
        res.status(404);
        throw new Error('Order not found')
    }
});

export {addOrderItems, getOrderById};