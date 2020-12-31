import express from 'express'
import {authUser, getUserProfile} from "../controllers/userController.js";
import {protect} from "../middlewares/authMiddleware.js";


const userRouter = express.Router();

userRouter.post('/login',authUser);
userRouter.route('/profile').get(protect, getUserProfile);

export default userRouter;
