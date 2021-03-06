import nextConnect from "next-connect";
const models = require("../../../db/models/index");
import middleware from "../../../middleware/auth";

const handler = nextConnect()
  .use(middleware)
  .get(async (req, res) => {
    const offers = await models.offers.findAndCountAll({
      order: [["id", "DESC"]],
    });

    res.statusCode = 200;
    res.json({
      status: "success",
      data: offers.rows,
      total: offers.count,
    });
  })
  .post(async (req, res) => {
    const { body } = req;
    const {
      host_id,
      participant_id,
      trade_id,
      resolved,
      offer_money,
      offer_beer,
      offer_other,
    } = body;
    const endpoint = trade_id + "b" + host_id + "b" + participant_id;
    const newOffer = await models.offers.create({
      host_id,
      participant_id,
      trade_id,
      offer_money,
      offer_beer,
      offer_other,
      resolved,
      endpoint,
    });

    if (!newOffer) {
      return res.status(500).json({
        status: "failed",
        message: `Database error, please try again later.`,
      });
    }
    return res.status(200).json({
      status: "success",
      message: `New Offer created with ID = ${newOffer.dataValues.id}`,
      data: newOffer,
    });
  });
export default handler;
