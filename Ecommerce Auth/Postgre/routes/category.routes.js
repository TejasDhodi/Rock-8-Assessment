const express = require('express');
const { categoryController, getSelectedCategory } = require('../controllers/category.controller');
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router();

router.put('/addCategory', verifyToken, categoryController);
router.get('/:userId', verifyToken, getSelectedCategory);

module.exports = router;
