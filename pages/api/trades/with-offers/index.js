import nextConnect from "next-connect";
const models = require("../../../../db/models/index");
import middleware from "../../../../middleware/auth";

const handler = nextConnect()
  .use(middleware)
  .get(async (req, res) => {
    const trades = await models.trades.findAll({
      include: [
        {
          model: models.users,
          as: "host",
          attributes: ["id", "username", "profile_pic"],
        },
        {
          model: models.offers,
          attributes: [
            "id",
            "resolved",
            "offer_money",
            "offer_beer",
            "offer_other",
          ],
          include: [
          {
            model: models.users,
            as: "participant",
            attributes: ["id", "username", "profile_pic"],
          },
          ],
        },
      ],
      order: [["id", "DESC"]],
    });

    res.statusCode = 200;
    res.json({
      status: "success",
      data: trades,
    });
  });
export default handler;
