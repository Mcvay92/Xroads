const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const profileController = require('../controllers/profile.controller');
const authMiddleware = require('../middlewares/authorizeToken');
const roleMiddleware = require('../middlewares/authorizeRole');

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.post('/addProfile', authMiddleware, profileController.addProfile);
router.get('/allProfiles', authMiddleware, profileController.getAllProfiles);
router.get('/profile/:id', authMiddleware, profileController.getSingleProfile);
router.put('/editprofile/:id', authMiddleware, profileController.editProfile);
router.delete('/deleteprofile/:id', authMiddleware, profileController.deleteProfile);

module.exports = router;