import nextConnect from "next-connect";
const models = require("../../../../db/models/index");
import middleware from "../../../../middleware/auth";

const handler = nextConnect()
  .use(middleware)
  .get(async (req, res) => {
    const { id } = req.query;
    const offerID = id;
    const offer = await models.offers.findOne({
      where: {
        id: offerID,
      },
      include: [
        {
          model: models.users,
          as: "host",
          attributes: ["id", "username", "profile_pic"],
        },
        { model: models.trades },
        {
          model: models.users,
          as: "participant",
          attributes: ["id", "username", "profile_pic"],
        },
      ],
    });

    if (!offer) {
      return res.status(400).json({
        status: "failed",
        message: `No offer found with ID = ${offerID}`,
      });
    }
    res.statusCode = 200;
    return res.json({ status: "success", data: offer });
  });

export default handler;
