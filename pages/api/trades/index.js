import nextConnect from "next-connect";
const models = require("../../../db/models/index");
import middleware from "../../../middleware/auth";

const handler = nextConnect()
  // Middleware
  .use(middleware)
  // Get method
  .get(async (req, res) => {
    const trades = await models.trades.findAndCountAll({
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
      data: trades.rows,
      total: trades.count,
      // nextPage: +nextPage + 5,
    });
  })
  .post(async (req, res) => {
    const { body } = req;
    const { user_id, title, content, open } = body;
    const newTrade = await models.trades.create({
      user_id,
      title,
      content,
      open,
    });

    if (!newTrade) {
      return res.status(500).json({
        status: "failed",
        message: `Database error, please try again later.`,
      });
    }
    return res.status(200).json({
      status: "success",
      message: `New Trade created with ID = ${newTrade.dataValues.id}`,
      data: newTrade,
    });
  });

export default handler;
