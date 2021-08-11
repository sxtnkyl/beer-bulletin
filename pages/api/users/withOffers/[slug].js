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
          model: models.offers,
          as: "user_offers",
          attributes: ["id", "participant_id", "resolved"],
          include: [
            {
              model: models.users,
              as: "host",
              attributes: ["id", "username", "profile_pic"],
            },
            {
              model: models.trades,
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
