const express = require('express');
const { registerUserController, sendMailController, loginUserController, getUserProfileController } = require('../Controller/Authentication.controller');
const { verifyToken } = require('../Middleware/VerifyToken.middleware');
const router = express.Router();

router.post('/registerUser/sendOtp', sendMailController);
router.post('/registerUser', registerUserController);
router.post('/loginUser', loginUserController);
router.get('/userProfile', verifyToken, getUserProfileController);

module.exports = router;