import express from 'express'
import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct
} from "../controllers/productController.js";
import {admin, protect} from "../middlewares/authMiddleware.js";


const productRouter = express.Router();


productRouter
    .route('/')
    .get(getProducts)
    .post(protect, admin, createProduct);
productRouter
    .route('/:id')
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

export default productRouter;
