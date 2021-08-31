import nextConnect from "next-connect";
console.log("connect");
const models = require("../../../../db/models/index");
console.log("models");
import middleware from "../../../../middleware/auth";
console.log("middle");
const handler = nextConnect()
  .use(middleware)
  .get(async (req, res) => {
    console.log("STARTING THE API ROUTE");
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
      order: [["id", "DESC"]],
    });
    console.log("IN THE API ROUTE!");
    res.statusCode = 200;
    res.json({
      status: "success",
      data: trades,
      // data: { test: "hardcoded" },
    });
  });
export default handler;
