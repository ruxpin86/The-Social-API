const mongoose = require('mongoose');
const { Thoughts, Reaction } = require('./index')

const userSchema = new mongoose.Schema({
    username: { type: String, Unique: true, Require: true }.trim(),

    email: { type: String, Unique: true, Require: true },

    thoughts: [Thougts._id],

    friends: []
})
