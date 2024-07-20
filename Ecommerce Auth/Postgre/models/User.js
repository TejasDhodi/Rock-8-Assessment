const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

User.prototype.generateToken = function () {
  return jwt.sign({ userId: this.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
};

module.exports = User;
