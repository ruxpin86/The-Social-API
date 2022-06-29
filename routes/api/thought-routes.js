const router = require("express").Router();
const { Thought } = require("../../models/");

//GET THOUGHTS
router.get("/", async (req, res) => {
  try {
    const thoughtData = await Thought.find({});
    res.status(200).json(thoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET SINGLE THOUGHT BY ID
router.get("/:id", async (req, res) => {
  try {
    const thoughtData = await Thought.findOne({});
    res.status(200).json(thoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE A THOUGHT
router.post("/", async (req, res) => {
  try {
    const newThought = new Thought({
      thoughtText: req.body.thoughtText,
      username: req.body.username,
    });
    newThought.save();
    if (newThought) {
      res.status(200).json(newThought);
    } else {
      console.log("Something went wrong");
      res.status(404).json({ message: "Something went wrong" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE REACTION TO A THOUGHT

//UPDATE THOUGHT
router.put("/:id", async (req, res) => {
  try {
    const updateThought = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (updateThought) {
      res.status(200).json(updateThought);
    } else {
      res.status(404).json({ message: "Could not update thought" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE THOUGHT
router.delete("/:id", async (req, res) => {
  try {
    const deleteThought = await Thought.deleteOne({ _id: req.params.id });
    res.status(200).json(deleteThought);
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
