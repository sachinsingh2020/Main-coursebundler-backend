import express from 'express';
import { addLecture, createCourse, deleteCourse, deleteLecture, getAllCourses, getCourseLectures } from '../controllers/courseController.js';
import { authorizeAdmin, authorizeSubscribers, isAuthenticated } from '../middlewares/auth.js';
import singleUpload from '../middlewares/multer.js';

const router = express.Router();

// get all courses without lectures 
router.route("/courses").get(getAllCourses);
// create new courses - only admin 
router.route('/createcourse').post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);
// Get Course, Add Lecture, Delete Course - only admin 
router.route('/course/:id').get(isAuthenticated, authorizeSubscribers, getCourseLectures).post(isAuthenticated, authorizeAdmin, singleUpload, addLecture).delete(isAuthenticated, authorizeAdmin, deleteCourse);
// Delete Lecture 
router.route('/lecture').delete(isAuthenticated, authorizeAdmin, deleteLecture);


export default router;