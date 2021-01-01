import express from 'express'
import {authUser, getUserProfile, registerUser} from "../controllers/userController.js";
import {protect} from "../middlewares/authMiddleware.js";


const userRouter = express.Router();

userRouter.post('/login', authUser);
userRouter.post('/', registerUser);
userRouter.route('/profile').get(protect, getUserProfile);

export default userRouter;
