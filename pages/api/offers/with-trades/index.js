import nextConnect from "next-connect";
const models = require("../../../../db/models/index");
import middleware from "../../../../middleware/auth";

const handler = nextConnect()
  .use(middleware)
  .get(async (req, res) => {
    const offers = await models.offers.findAll({
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
      order: [["id", "DESC"]],
    });

    res.statusCode = 200;
    res.json({
      status: "success",
      data: offers,
    });
  });

export default handler;
