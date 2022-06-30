const mongoose = require("mongoose");

const reactionSchema = require("./Reaction");

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      Required: true,
    },

    reactions: [reactionSchema],
  },
  {
    toJSON: {
      vitruals: true,
    },
    id: false,
  }
);

thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return this.reactions.length;
  });

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
