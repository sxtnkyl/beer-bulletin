const router = require("express").Router();
const { Chat, Trade, User } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const tradeData = await Trade.findAll();
    res.status(200).json(tradeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
