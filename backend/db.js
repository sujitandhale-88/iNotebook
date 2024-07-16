const mongoose = require('mongoose');

// Connect to MongoDB
const connectToMongo = async () => {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/inotebook');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
    }
};

module.exports = connectToMongo;
