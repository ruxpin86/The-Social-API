const mongoose = require('mongoose');

const { Thoughts, Reaction } = require('./index')

const userSchema = new mongoose.Schema({
    username: { type: String, Unique: true, Require: true },

    email: { type: String, Unique: true, Require: true },

    // thoughts: [Thougts._id],

    // friends: [User._id]
})

const User = mongoose.model('User', userSchema)

const handleError = (err) => console.error(err)

User.create(
    {
        username: "TSwift",
        email: "ted@ted.com"
    }
)

module.exports = User