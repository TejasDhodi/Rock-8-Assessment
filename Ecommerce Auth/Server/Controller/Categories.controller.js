const categoryModel = require("../Model/Category.model");

const categoryController = async (req, res) => {
    try {
        const { category, userId } = req.body;

        const selectedCategory = await categoryModel.findOneAndUpdate({userId}, {category}, {
            upsert: true,
            new: true
        });

        return res.status(201).json({
            success: true,
            message: 'Categories added successfully',
            selectedCategory
        })

    } catch (error) {
        console.log('error from category Controller catch', error.message);
        return res.status(500).json({
            success: false,
            message: 'Error from category Controller catch',
            error: error.message
        })
    }
};

const getSelectedCategory = async (req, res) => {
    try {
        const { userId } = req.params;

        const selectedCategory = await categoryModel.findOne({ userId })
        return res.status(200).json({
            success: true,
            message: 'Found Selected Category',
            selectedCategory
        })

    } catch (error) {
        console.log('error from get category Controller catch', error.message);
        return res.status(500).json({
            success: false,
            message: 'Error from get category Controller catch',
            error: error.message
        })
    }
}
module.exports = {categoryController, getSelectedCategory}