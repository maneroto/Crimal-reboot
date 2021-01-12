const mongoose = require('mongoose');

// Initialize the Schema
const { Schema } = mongoose;

const UserSchema = new Schema({
    creation_date: {
        type: Date,
        default: Date.now(),
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'basic',
        enum: [
            'basic',
            'advanced',
            'receptionist',
            'nutriotionist',
            'psychologist',
            'physiotherapist',
            'medic',
            'accountant',
            'admin',
        ],
    },
    accessToken: {
        type: String,
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    phone: {
        type: String,
    },
    location: {
        country: {
            type: String,
        },
        state: {
            type: String,
        },
        city: {
            type: String,
        },
        street: {
            type: String,
        },
        postal_code: {
            type: String,
        },
    },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
