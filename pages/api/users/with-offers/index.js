import nextConnect from "next-connect";
const models = require("../../../../db/models/index");
import middleware from "../../../../middleware/auth";
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

    const users = await models.users.findAll({
      attributes: [
        "id",
        "username",
        "email",
        [fn("CONCAT", col("first_name"), " ", col("last_name")), "name"],
        [fn("COUNT", col("user_trades.id")), "num_trades"],
        "profile_pic",
      ],
      include: [
        {
          model: models.trades,
          as: "user_trades",
          attributes: [],
        },
        {
          model: models.offers,
          as: "offers_made",
          attributes: [
            "id",
            "participant_id",
            "host_id",
            "trade_id",
            "resolved",
            "offer_money",
            "offer_beer",
            "offer_other",
            "endpoint",
          ],
          include: [
            {
              model: models.users,
              as: "host",
              attributes: ["id", "username", "profile_pic"],
            },
            {
              model: models.trades,
            },
          ],
        },
      ],
      group: ["User.id", "offers_made.id"],
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
      data: users,
    });
  });

export default handler;
