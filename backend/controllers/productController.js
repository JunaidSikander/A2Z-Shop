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

//@desc     Delete Product
//@route    DELETE /api/products/:id
//@access   Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.json({message: 'Product removed'})
    } else {
        res.status(404);
        throw new Error('Product not found')
    }


});

export {getProducts, getProductById, deleteProduct}