const express = require('express');
const { registerUserController, sendMailController, loginUserController, getUserProfileController } = require('../controllers/authentication.controller');
const { verifyToken } = require('../middleware/verifyToken');
const router = express.Router();

router.post('/registerUser/sendOtp', sendMailController);
router.post('/registerUser', registerUserController);
router.post('/loginUser', loginUserController);
router.get('/userProfile', verifyToken, getUserProfileController);

module.exports = router;
