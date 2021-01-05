import express from 'express'
import {
    authUser,
    deleteUser,
    getAllUsers,
    getUserById,
    getUserProfile,
    registerUser,
    updateUser,
    updateUserProfile
} from "../controllers/userController.js";
import {admin, protect} from "../middlewares/authMiddleware.js";


const userRouter = express.Router();

userRouter.post('/login', authUser);
userRouter
    .route('/')
    .post(registerUser)
    .get(protect, admin, getAllUsers);
userRouter
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

userRouter
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

export default userRouter;
