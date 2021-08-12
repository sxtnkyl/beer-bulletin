import nextConnect from "next-connect";
const models = require("../../../db/models/index");
import middleware from "../../../middleware/auth";
const { fn, col } = models.sequelize;

const handler = nextConnect()
  // Middleware
  .use(middleware)
  // Get method
  .get(async (req, res) => {
    const users = await models.users.findAndCountAll({
      attributes: [
        "id",
        "username",
        "email",
        [fn("CONCAT", col("first_name"), " ", col("last_name")), "name"],
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
      group: ["User.id"],
      order: [["id", "DESC"]],
    });
    res.statusCode = 200;
    res.json({
      status: "success",
      data: users.rows,
      total: users.rows.length,
    });
  })
  .post(async (req, res) => {
    const { body } = req;
    const {
      username,
      email,
      password,
      first_name,
      last_name,
      pref_dark,
      profile_pic,
    } = body;
    const newUser = await models.users.create({
      username,
      email,
      password,
      first_name,
      last_name,
      pref_dark,
      profile_pic,
    });

    if (!newUser) {
      return res.status(500).json({
        status: "failed",
        message: `Database error, please try again later.`,
      });
    }
    return res.status(200).json({
      status: "success",
      message: `New User created with ID = ${newUser.dataValues.id}`,
      data: newUser,
    });
  });

export default handler;
