import nextConnect from "next-connect";
const models = require("../../../../db/models/index");
import middleware from "../../../../middleware/auth";

const handler = nextConnect()
  .use(middleware)
  .get(async (req, res) => {
    // const {
    //   query: { id, name },
    // } = req;
    const { slug } = req.query;
    const userId = slug;
    const user = await models.users.findOne({
      where: {
        id: userId,
      },
      attributes: [
        "id",
        "username",
        "email",
        "first_name",
        "last_name",
        "profile_pic",
      ],
      include: [
        {
          model: models.trades,
          as: "user_trades",
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
    });
    res.statusCode = 200;
    return res.json({ status: "success", data: user });
  })
  .post(async (req, res) => {})
  .put(async (req, res) => {})
  .patch(async (req, res) => {});

export default handler;
