const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/authorizeToken');
const roleMiddleware = require('../middlewares/authorizeRole');


router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.post('/uploadImage',authMiddleware, userController.uploadImage);
router.post('/deleteImage',authMiddleware, userController.deleteImage);
router.get('/profile/:id', authMiddleware, userController.getProfile);
router.put('/editprofile/:id', authMiddleware, userController.editProfile);

module.exports = router;