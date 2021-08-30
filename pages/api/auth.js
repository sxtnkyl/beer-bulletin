import models from "../../db/models/index";
import nextConnect from "next-connect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const Op = require("sequelize").Op;

const KEY = process.env.JWT_KEY;

const handler = nextConnect()
  .get((req, res) => {})
  .post(async (req, res) => {
    /* Get Post Data */
    const { email: userInfo, password } = req.body;
    /* Any how email or password is blank */
    if (!userInfo || !password) {
      return res.status(400).json({
        status: "error",
        error: "Request missing username or password",
      });
    }
    /* Check user in database */
    const user = await models.users.findOne({
      where: {
        [Op.or]: [
          {
            email: userInfo,
          },
          { username: userInfo },
        ],
      },
      attributes: ["id", "profile_pic", "email", "username", "password"],
      limit: 1,
    });
    /* Check if exists */
    if (!user) {
      res.status(400).json({ status: "error", error: "User Not Found" });
    }
    /* Define variables */
    const dataUser = user.toJSON();
    const userId = dataUser.id,
      userEmail = dataUser.email,
      username = dataUser.username,
      userPic = dataUser.profile_pic,
      userPassword = dataUser.password;

    /* Check and compare password */
    bcrypt.compare(password, userPassword).then((isMatch) => {
      if (isMatch) {
        /* User matched */
        /* Create JWT Payload */
        const payload = {
          id: userId,
          email: userEmail,
          username: username,
          profPic: userPic,
        };
        /* Sign token */
        jwt.sign(
          payload,
          KEY,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.status(200).json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        res.status(400).json({ status: "error", error: "Password incorrect" });
      }
    });
  });
export default handler;
