import nextConnect from "next-connect";
const models = require("../../../../db/models/index");
import middleware from "../../../../middleware/auth";
const { fn, col } = models.sequelize;

const handler = nextConnect()
  // Middleware
  .use(middleware)
  // Get method
  .get(async (req, res) => {
    const usersData = await models.users.findAll({
      attributes: [
        "id",
        "username",
        "email",
        [
          fn("CONCAT", col("User.first_name"), " ", col("User.last_name")),
          "name",
        ],
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
      order: [["id", "DESC"]],
    });
    const users = usersData.map((user) => user.get({ plain: true }));
    users.map((user) => (user.num_trades = user.user_trades.length));
    res.statusCode = 200;
    res.json({
      status: "success",
      data: users,
    });
  });

export default handler;
