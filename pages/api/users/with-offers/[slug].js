import nextConnect from "next-connect";
const models = require("../../../../db/models/index");
import middleware from "../../../../middleware/auth";
const { fn, col } = models.sequelize;

const handler = nextConnect()
  .use(middleware)
  .get(async (req, res) => {
    // const {
    //   query: { id, name },
    // } = req;
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
          ],
          attributes: [
            "id",
            "participant_id",
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
    });
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: `No user found with ID = ${userId}`,
      });
    }
    res.statusCode = 200;
    return res.json({ status: "success", data: user });
  });

export default handler;
