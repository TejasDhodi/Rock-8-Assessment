const { model, Schema } = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

// To generate token

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1d'
        })
    } catch (error) {
        console.log('JWT Error ', error);
    }
}

const userModel = model('User', userSchema);
module.exports = userModel;