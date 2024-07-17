const express = require('express');
const {categoryController, getSelectedCategory} = require('../Controller/Categories.controller');

const router = express.Router();

router.put('/addCategory', categoryController)
router.get('/:userId', getSelectedCategory)

module.exports = router;