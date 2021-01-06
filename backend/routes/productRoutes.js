import express from 'express'
import {deleteProduct, getProductById, getProducts} from "../controllers/productController.js";
import {admin, protect} from "../middlewares/authMiddleware.js";


const productRouter = express.Router();


productRouter.route('/').get(getProducts);
productRouter
    .route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct);

export default productRouter;
