const router = require("express").Router();
const userRoutes = require("./userRoutes");
const chatRoutes = require("./chatRoutes");
const tradeRoutes = require("./tradeRoutes");

router.use("/chats", chatRoutes);
router.use("/users", userRoutes);
router.use("/trades", tradeRoutes);

module.exports = router;
