import nextConnect from "next-connect";
const models = require("../../../db/models/index");
import middleware from "../../../middleware/auth";
const { fn, col } = models.sequelize;

const handler = nextConnect()
  // Middleware
  .use(middleware)
  // Get method
  .get(async (req, res) => {
    const {
      // query: { nextPage },
      query,
      method,
      body,
    } = req;

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
      order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ["id", "DESC"],
      ],
      // offset: nextPage ? +nextPage : 0,
      // limit: 5,
    });
    res.statusCode = 200;
    res.json({
      status: "success",
      data: users.rows,
      total: users.rows.length,
      // nextPage: +nextPage + 5,
    });
  })
  // ============  METHODS BELOW NEED ATTENTION/UPDATES ================ //
  // Post method
  .post(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const { username, email, password } = body;
    const userId = slug;
    const newUser = await models.users.create({
      username,
      email,
      password,
      status: 1,
    });
    return res.status(200).json({
      status: "success",
      message: "done",
      data: newUser,
    });
  })
  // Put method
  .put(async (req, res) => {
    res.end("method - put");
  })
  // Patch method
  .patch(async (req, res) => {
    throw new Error("Throws me around! Error can be caught and handled.");
  });

export default handler;
