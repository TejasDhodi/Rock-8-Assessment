const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connection Established');
    } catch (error) {
        console.log("Connection Error from Database.js : ", error);
    }
}

module.exports = connectToDatabase;
