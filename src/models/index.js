const mongoose = require('mongoose');

// Retrieve all models
const User = require('./User');

/**
 * Connect to the MongoDB
 */
const connectDB = () =>
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });

/**
 * Use the standard promise as the mongoose promise
 */
mongoose.Promise = global.Promise;

const models = { User };

/**
 * Export all the modules that are needed
 */
module.exports = {
    connectDB,
    models,
};
