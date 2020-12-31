import express from 'express'
import {authUser} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/login',authUser);

export default userRouter;
