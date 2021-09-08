import express from 'express';
import { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser } from './userController.js'
import { protect, userAdminProtect, roleCreatorProtect } from './authMiddleware.js'
const router = express.Router()

router.route('/').post(roleCreatorProtect, registerUser).get(protect, userAdminProtect, getUsers);
router.route('/:id').delete(protect, userAdminProtect, deleteUser);
router.post('/login', authUser);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);




export default router;