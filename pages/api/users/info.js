import nextConnect from "next-connect";
const models = require("../../../db/models/index");
import middleware from "../../../middleware/auth";

const handler = nextConnect()
  // Middleware
  .use(middleware)
  // Get method
  .get(async (req, res) => {
    const {
      // query: { nextPage },
      query,
      method,
      body,
    } = req;

    const users = await models.users.findAll({
      attributes: ["id", "username", "profile_pic"],
      include: [
        {
          model: models.trades,
          as: "user_trades",
          attributes: ["id", "title"],
          include: [
            {
              model: models.offers,
              attributes: ["id", "resolved"],
              include: [
                {
                  model: models.users,
                  as: "participant",
                  attributes: ["id", "username", "profile_pic"],
                },
              ],
            },
          ],
        },
      ],
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
      data: users,
      // nextPage: +nextPage + 5,
    });
  })
  // Patch method
  .patch(async (req, res) => {
    throw new Error("Throws me around! Error can be caught and handled.");
  });

export default handler;
