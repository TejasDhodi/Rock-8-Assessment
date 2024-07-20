const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
let storedOtp = '';

const sendMailController = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = Math.floor(Math.random() * 90000000 + 10000000);

        const userExist = await User.findOne({ where: { email } });

        if (userExist) {
            return res.status(400).json({
                success: false,
                message: 'Email Already Exist'
            });
        }

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_USER_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'rock8 careers E-Commerce Verification',
            html: `<h1>Do Not Share With anyone</h1><p>Your OTP is: <strong>${otp}</strong></p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Error from transporter.sendMail',
                    error: error.message
                });
            } else {
                storedOtp = otp;
                return res.status(200).json({
                    success: true,
                    message: 'Otp sent successfully',
                    otp
                });
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error from sendMailController",
            error: error.message
        });
    }
};

const registerUserController = async (req, res) => {
    try {
        const { name, email, password, otp } = req.body;

        if (otp !== storedOtp) {
            return res.status(404).json({
                success: false,
                message: 'Invalid OTP'
            });
        }

        storedOtp = '';

        const saltRound = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, saltRound);

        const registerUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: 'Register Success',
            registeredUser: registerUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error from registerUserController",
            error: error.message
        });
    }
};

const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ where: { email } });

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields Are Mandatory",
            });
        } else if (!userExist) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }

        const comparePassword = await bcryptjs.compare(password, userExist.password);

        if (comparePassword) {
            return res.status(200).json({
                success: true,
                message: 'Login Successful',
                userToken: await userExist.generateToken()
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error from loginUserController",
            error: error.message
        });
    }
};

const getUserProfileController = async (req, res) => {
    try {
        const userData = req.userData;
        const userToken = req.userToken;
        const userId = req.userId

        return res.status(200).json({
            success: true,
            message: 'User Verified',
            verifiedUser: userData,
            userToken,
            userId
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error from getUserProfileController',
            error: error.message
        });
    }
};

module.exports = { registerUserController, sendMailController, loginUserController, getUserProfileController };
