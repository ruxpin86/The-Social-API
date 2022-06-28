const router = require("express").Router()
const { User, Thought, Reaction } = require("../../models/index")


//GET ALL USERS
router.get("/", async (req, res) => {
    try {
        const userData = await User.find({})
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET SINGLE USER
router.get("/:id", async (req, res) => {
    try {
        const userData = await User.findOne({})
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/', async (req, res) => {
    try {
        const newUserData = await new User({
            username: req.params.username,
            email: req.params.email
        })
        newUserData.save();
        if (newUserData) {
            res.status(200).json(newUserData);
        } else {
            console.log('Something went wrong');
            res.status(500).json({ message: 'Something went wrong' })
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

//Export
module.exports = router