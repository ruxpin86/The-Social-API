const mongoose = require("mongoose");

//Create User model structure
const userSchema = new mongoose.Schema(
  {
    username: { type: String, Unique: true, Required: true },

    email: { type: String, Unique: true, Required: true },

    thoughts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      vitruals: true,
    },
    id: false,
  }
);

//Virtuals
userSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    return this.friends.length;
  });

const User = mongoose.model("User", userSchema);

const handleError = (err) => console.error(err);

//Seed a user to get started and test
User.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    User.insertMany(
      [{ username: "TGlynn86", email: "ted@ted.com" }],
      (insertErr) => {
        if (insertErr) {
          handleError(insertErr);
        }
      }
    );
  }
});

//Export model
module.exports = User;
