const router = require("express").Router();
const { Chat, Trade, User } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: Trade, as: "user_trades", include: [Chat] }],
    });

    if (!userData) {
      res.status(404).json({ message: "No user found with that id" });
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
