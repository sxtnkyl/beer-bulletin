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
    const { id } = req.query;
    const userId = id;
    const userData = await models.users.findOne({
      where: {
        id: userId,
      },
      attributes: [
        "id",
        "username",
        "email",
        "first_name",
        "last_name",
        "profile_pic",
      ],
      include: [
        {
          model: models.trades,
          as: "user_trades",
          include: [
            {
              model: models.offers,
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
                  as: "participant",
                  attributes: ["id", "username", "profile_pic"],
                },
                {
                  model: models.trades,
                },
              ],
            },
          ],
        },
      ],
    });
    if (!userData) {
      return res.status(400).json({
        status: "failed",
        message: `No user found with ID = ${userId}`,
      });
    }
    const user = userData.get({ plain: true });
    user.num_trades = user.user_trades.length;
    res.statusCode = 200;
    return res.json({ status: "success", data: user });
  });

export default handler;
