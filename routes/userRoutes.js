import express from 'express';
import { addToPlaylist, changePassword, deleteMyProfile, deleteUser, forgetPassword, getAllUsers, getMyProfile, login, logout, register, removeFromPlaylist, resetPassword, updateProfile, updateProfilePicture, updateUserRole } from '../controllers/userController.js';
import { authorizeAdmin, isAuthenticated } from '../middlewares/auth.js';
import singleUpload from '../middlewares/multer.js';

const router = express.Router();

// To register a new user 
router.route('/register').post(singleUpload, register);
// Login 
router.route('/login').post(login);
// Logout 
router.route('/logout').get(logout);
// Get my Profile 
// router.route('/me').get(isAuthenticated, getMyProfile);
// Delete my Profile 
router.route('/me').delete(isAuthenticated, deleteMyProfile);
// Change Password 
router.route('/changepassword').put(isAuthenticated, changePassword);
// Update Profile 
router.route('/updateprofile').put(isAuthenticated, updateProfile);
// Update Profile Picture 
router.route('/updateprofilepicture').put(isAuthenticated, singleUpload, updateProfilePicture);
// Forget Pasword 
router.route('/forgetpassword').post(forgetPassword);
// Reset Password 
router.route('/resetpassword/:token').put(resetPassword);
// Add to Playlist 
router.route('/addtoplaylist').post(isAuthenticated, addToPlaylist);
// Remove from Playlist 
router.route('/removefromplaylist').delete(isAuthenticated, removeFromPlaylist);


// ADMIN ROUTES 

// Get All Users
router.route('/admin/users').get(isAuthenticated, authorizeAdmin, getAllUsers);
// Update User Role , Delete User
router.route('/admin/user/:id').put(isAuthenticated, authorizeAdmin, updateUserRole).delete(isAuthenticated, authorizeAdmin, deleteUser);

export default router;