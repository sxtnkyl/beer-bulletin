import nextConnect from "next-connect";
const models = require("../../../../db/models/index");
import middleware from "../../../../middleware/auth";

const handler = nextConnect()
  .use(middleware)
  .get(async (req, res) => {
    const {
      query: { id, name },
    } = req;
    const { slug } = req.query;
    const offerID = slug;
    const offer = await models.offers.findOne({
      where: {
        id: offerID,
      },
      attributes: ["id", "resolved"],
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
    res.statusCode = 200;
    return res.json({ status: "success", data: offer });
  })
  .post(async (req, res) => {})
  .put(async (req, res) => {})
  .patch(async (req, res) => {});

export default handler;
