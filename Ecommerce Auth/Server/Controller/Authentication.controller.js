const userModel = require("../Model/Authentication.model");
const bcryptjs = require('bcryptjs');

const nodemailer = require('nodemailer');
let storedOtp = '';

const sendMailController = async (req, res) => {
    try {

        const { email } = req.body;
        const otp = Math.floor(Math.random() * 90000000 + 10000000);

        const userExist = await userModel.findOne({ email });

        if (userExist) {
            return res.status(400).json({
                success: false,
                message: 'Email Already Exist'
            })
        } 

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_USER_PASS
            }
        })

        // Mail Options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'rock8 careers E-Commerce Verification',
            html: ` <h1>Do Not Share With any one</h1>
            <p>Your OTP is: <strong>${otp}</strong></p>
            `
        }

        // sendMail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: 'error form transporter.sendMail',
                    error: error.message
                })
            } else {
                storedOtp = otp
                console.log(`OTP stored for ${email}: ${otp}`); // Log stored OTP
                return res.status(200).json({
                    success: true,
                    message: 'Otp sent successfully',
                    otp
                })
            }
        })

        console.log(storedOtp);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error From SendMail Controller",
            error: error.message
        })
    }
}

const registerUserController = async (req, res) => {
    try {

        const { name, email, password, otp } = req.body;

        console.log('sent otp : ', storedOtp);

        if (otp !== storedOtp) {
            console.log(`Invalid OTP for ${email}. Received: ${otp}, Expected: ${storedOtp}`);
            return res.status(404).json({
                success: false,
                message: 'Invalid OTP'
            })
        }

        // Remove OTP from storage after use
        storedOtp = ''
        
        const saltRound = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, saltRound);

        const registerUser = await userModel.create({
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
            message: "Error From register Controller",
            error: error.message
        })
    }
}

const loginUserController = async (req, res) => {
    try {
        const {email, password} = req.body;

        const userExist = await userModel.findOne({email});

        if(!userExist) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            })
        }

        const comparePassword = await bcryptjs.compare(password, userExist.password);

        if(comparePassword) {
            return res.status(200).json({
                success: true,
                message: 'Login Successfull',
                userToken : await userExist.generateToken()
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error From login Controller",
            error: error.message
        })
    }
}

const getUserProfileController = async (req, res) => {
    try {
        const userData = req.userData;
        const userToken = req.userToken;

        console.log({
            userData,
            userToken
        });

        return res.status(200).json({
            success: true,
            message: 'User Verified',
            verifiedUser: userData,
            userToken
        })

    } catch (error) {
        console.log('error from userProfile Controller catch', error.message);
        return res.status(500).json({
            success: false,
            message: 'Error from getUser profile catch',
            error: error.message
        })
    }
}


module.exports = { registerUserController, sendMailController, loginUserController, getUserProfileController }