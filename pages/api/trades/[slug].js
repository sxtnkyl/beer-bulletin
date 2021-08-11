import nextConnect from "next-connect";
const models = require("../../../db/models/index");

const handler = nextConnect()
  .get(async (req, res) => {
    const {
      query: { id, name },
    } = req;
    const { slug } = req.query;
    const tradeID = slug;
    const trade = await models.trades.findOne({
      where: {
        id: tradeID,
      },
    });
    res.statusCode = 200;
    return res.json({ status: "success", data: trade });
  })
  .post(async (req, res) => {})
  .put(async (req, res) => {})
  .patch(async (req, res) => {});

export default handler;
