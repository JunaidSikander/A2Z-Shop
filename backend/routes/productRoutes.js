import express from 'express'
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const productRouter = express.Router();

//@desc     Fetch all products
//@route    GET /api/products
//@access   Pubic
productRouter.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({});

    if (products)
        res.json(products);
    else
        res.status(404).json({message: 'Product not found'})
}));

//@desc     Fetch single product
//@route    GET /api/products/:id
//@access   Pubic
productRouter.get('/:id', asyncHandler(async (req, res) => {
    const products = await Product.findById(req.params.id);

    if (products)
        res.json(products);
    else
        res.status(404).json({message: 'Product not found'})

}));

export default productRouter;
