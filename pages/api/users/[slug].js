import nextConnect from "next-connect";
const models = require("../../../db/models/index");
import middleware from "../../../middleware/auth";
const { fn, col } = models.sequelize;

const handler = nextConnect()
  .use(middleware)
  .get(async (req, res) => {
    const { slug } = req.query;
    const userId = slug;
    const user = await models.users.findOne({
      where: {
        id: userId,
      },
      attributes: [
        "id",
        "username",
        "email",
        "first_name",
        "last_name",
        [fn("COUNT", col("user_trades.id")), "num_trades"],
        "pref_dark",
        "profile_pic",
      ],
      include: [
        {
          model: models.trades,
          as: "user_trades",
          attributes: [],
        },
      ],
    });

    if (!user.id) {
      return res.status(400).json({
        status: "failed",
        message: `No user found with ID = ${userId}`,
      });
    }

    res.statusCode = 200;
    return res.json({ status: "success", data: user });
  })
  .put(async (req, res) => {
    const { slug } = req.query;
    const userId = slug;
    const userData = await models.users.update(req.body, {
      where: {
        id: userId,
      },
    });
    if (userData[0] === 0) {
      return res.status(400).json({
        status: "failed",
        message: `No new data or no user found with ID = ${userId}`,
      });
    }

    return res.status(200).json({
      status: "success",
      message: `Updated User ID = ${userId}`,
    });
  })
  .delete(async (req, res) => {
    const { slug } = req.query;
    const userId = slug;
    const userData = await models.users.destroy({
      where: {
        id: userId,
      },
    });

    if (!userData) {
      return res.status(400).json({
        status: "failed",
        message: `No user found with ID = ${userId}`,
      });
    }

    return res.status(200).json({
      status: "success",
      message: `Deleted User ID = ${userId}`,
    });
  });

export default handler;
