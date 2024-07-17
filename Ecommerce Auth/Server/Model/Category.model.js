const { model, Schema } = require('mongoose');

const categorySchema = new Schema({
    userId: {
        type: String
    },
    category: {
        type: Object
    }
});

const categoryModel = model('category', categorySchema);
module.exports = categoryModel;;