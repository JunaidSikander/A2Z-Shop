import asyncHandler from 'express-async-handler'
import Product from "../models/productModel.js";

//@desc     Fetch all products
//@route    GET /api/products
//@access   Pubic
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products)
});

//@desc     Fetch single product
//@route    GET /api/products/:id
//@access   Pubic
const getProductById = asyncHandler(async (req, res) => {
    const products = await Product.findById(req.params.id);
    res.json(products)
});

export {getProducts, getProductById}