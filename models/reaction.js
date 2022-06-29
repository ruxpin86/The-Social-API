const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const reactionSchema = new mongoose.Schema({
  reactionID: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new ObjectId(),
  },

  reactionBody: {
    type: String,
    Required: true,
    maxlength: 280,
    minlength: 1,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  username: {
    type: String,
    Required: true,
  },
});

module.exports = reactionSchema;
