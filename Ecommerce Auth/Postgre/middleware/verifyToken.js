const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        if (!token || !token.startsWith('Bearer ')) {
            return res.status(404).json({
                success: false,
                message: 'Token not provided or malformed'
            });
        }

        const userToken = token.replace('Bearer ', '').trim();

        const verifiedUser = jwt.verify(userToken, process.env.JWT_SECRET_KEY);

        const userData = await User.findOne({ where: { id: verifiedUser.userId } });

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        req.userId = userData.id;
        req.userData = userData;
        req.userToken = token;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Unable to verify JSON Web Token',
            error: error.message
        });
    }
};

module.exports = { verifyToken };
