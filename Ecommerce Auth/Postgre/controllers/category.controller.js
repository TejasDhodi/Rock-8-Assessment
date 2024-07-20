const Category = require('../models/Category');

const categoryController = async (req, res) => {
    const { category } = req.body;
    const userId = req.userId;

    try {
        const existingCategory = await Category.findOne({ where: { userId } });

        if (existingCategory) {
            // Update existing record
            existingCategory.category = category;
            await existingCategory.save();
        } else {
            // Create new record if none exists
            await Category.create({ category, userId });
        }

        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'An error occurred while updating category' });
    }
};

const getSelectedCategory = async (req, res) => {
    try {
        const userId = req.userId;

        const selectedCategory = await Category.findOne({ where: { userId } });
        return res.status(200).json({
            success: true,
            message: 'Found Selected Category',
            selectedCategory
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error from getSelectedCategory',
            error: error.message
        });
    }
};

module.exports = { categoryController, getSelectedCategory };
