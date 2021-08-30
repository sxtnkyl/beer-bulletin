import nextConnect from "next-connect";
const models = require("../../../../db/models/index");
import middleware from "../../../../middleware/auth";

const handler = nextConnect()
  // Middleware
  .use(middleware)
  // Get method
  .get(async (req, res) => {
    const { id } = req.query;
    const tradeID = id;
    const trade = await models.trades.findOne({
      where: {
        id: tradeID,
      },
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
            "endpoint",
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
    });

    if (!trade) {
      return res.status(400).json({
        status: "failed",
        message: `No trade found with ID = ${tradeID}`,
      });
    }
    res.statusCode = 200;
    res.json({
      status: "success",
      data: trade,
    });
  });

export default handler;
