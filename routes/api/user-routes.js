const router = require("express").Router();
const { User, Thought, Reaction } = require("../../models/index");
const ObjectId = require("mongoose").Types.ObjectId;

//GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const userData = await User.find({});
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET SINGLE USER
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findOne({});
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE NEW USER
router.post("/", async (req, res) => {
  try {
    const newUserData = await new User({
      username: req.body.username,
      email: req.body.email,
    });
    newUserData.save();
    if (newUserData) {
      res.status(200).json(newUserData);
    } else {
      console.log("Something went wrong");
      res.status(500).json({ message: "Something went wrong" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//ADD A FRIEND
router.post("/:id/friends/:friendId", async (req, res) => {
  try {
    const currentUser = await User.findOne({
      _id: new ObjectId(req.params.id),
    });
    currentUser.friends.push(new ObjectId(req.params.friendId));
    await currentUser.save();
    if (currentUser) {
      res.status(200).json(currentUser);
    } else {
      console.log("Something went wrong");
      res.status(500).json({ message: "Something went wrong" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE USER BY ID
router.put("/:id", async (req, res) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (updateUser) {
      res.status(200).json(updateUser);
    } else {
      res.status(404).json({ message: "Could not update user" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE A USER
router.delete("/:id", async (req, res) => {
  try {
    const deleteUser = await User.deleteOne({ _id: req.params.id });
    res.status(200).json(deleteUser);
  } catch (err) {
    res.status(500);
  }
});

//DELETE FRIEND
router.delete("/:id/friends/:friendId", async (req, res) => {
  try {
    const deleteFriend = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: ObjectId(req.params.friendId) } },
      { runValidators: true, new: true }
    );
    await deleteFriend.save();
    if (deleteFriend) {
      res.status(200).json(deleteFriend);
    } else {
      res
        .status(400)
        .json({ message: "Could not remove friend with that ID." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Export
module.exports = router;
