import express from 'express'
import {
    createProduct,
    createProductReview,
    deleteProduct,
    getProductById,
    getProducts,
    getTopProducts,
    updateProduct
} from "../controllers/productController.js";
import {admin, protect} from "../middlewares/authMiddleware.js";


const productRouter = express.Router();


productRouter.get('/top', getTopProducts);
productRouter
    .route('/')
    .get(getProducts)
    .post(protect, admin, createProduct);
productRouter
    .route('/:id')
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

productRouter.route('/:id/reviews').post(protect, createProductReview);

export default productRouter;
