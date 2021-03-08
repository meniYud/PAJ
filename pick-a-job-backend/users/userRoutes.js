import express from 'express';
import { authUser, getUserProfile, registerUser, updateUserProfile, getUsers } from './userController.js'
import { protect, adminProtect, roleCreatorProtect } from './authMiddleware.js'
const router = express.Router()

router.route('/').post(roleCreatorProtect, registerUser).get(protect, adminProtect, getUsers);
router.post('/login', authUser);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);




export default router;