import nextConnect from "next-connect";
const models = require("../../../db/models/index");
import middleware from "../../../middleware/auth";

const handler = nextConnect()
  .use(middleware)
  .get(async (req, res) => {
    const { slug } = req.query;
    const offerID = slug;
    const offer = await models.offers.findOne({
      where: {
        id: offerID,
      },
    });
    if (!offer) {
      return res.status(400).json({
        status: "failed",
        message: `No offer found with ID = ${offerID}`,
      });
    }
    res.statusCode = 200;
    return res.json({ status: "success", data: offer });
  })
  .put(async (req, res) => {
    const { slug } = req.query;
    const offerID = slug;
    const offerData = await models.offers.update(req.body, {
      where: {
        id: offerID,
      },
    });
    if (offerData[0] === 0) {
      return res.status(400).json({
        status: "failed",
        message: `No new data or no user found with ID = ${offerID}`,
      });
    }

    return res.status(200).json({
      status: "success",
      message: `Updated Offer ID = ${offerID}`,
    });
  })
  .delete(async (req, res) => {
    const { slug } = req.query;
    const offerID = slug;
    const offerData = await models.offers.destroy({
      where: {
        id: offerID,
      },
    });

    if (!offerData) {
      return res.status(400).json({
        status: "failed",
        message: `No offer found with ID = ${offerID}`,
      });
    }

    return res.status(200).json({
      status: "success",
      message: `Deleted Offer ID = ${offerID}`,
    });
  });

export default handler;
