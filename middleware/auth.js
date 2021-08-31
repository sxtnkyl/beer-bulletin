import nextConnect from "next-connect";
import { verifyToken } from "./utils";

const middleware = nextConnect();

/* Sample using middleware */
/* middleware.use(database).use(session).use(passport.initialize()).use(passport.session()); */

/* Set restricted public access / put any api access that is restricted in here */
// put secured or restricted routes in here V
const restricted = ["/api/trades/[id]"];
/*
 * @params {request, response, callback} default Request and Response
 * @return {object} object if true, response message if false and continue
 */
export default middleware.use(async (req, res, next) => {
  console.log("HITTING THE MIDDLEWARE");
  let authHeader = req.headers.authorization || "";

  let user = {};
  //no auth header and not on restricted list
  if (
    !restricted.some((re) => {
      if (re.endsWith("[id]")) {
        let newUrl = req.url.replace(req.query.id, "[id]");
        return newUrl === re;
      }
      return req.url === re;
    }) &&
    !authHeader
  ) {
    return next();
  }
  if (authHeader) {
    let sessionID = authHeader.split(" ")[1];
    if (sessionID) {
      if (user) {
        /* Could put check against users tables in database  User.find({email:user.email}) */
        req.user = user;
      } else {
        res.statusCode = 401;
        return res.send({
          status: "error",
          error: "Expired",
        });
      }
    } else {
      res.statusCode = 401;
      return res.send({
        status: "error",
        error: "Wrong Token",
      });
    }
  } else {
    res.statusCode = 401;
    return res.send({
      status: "error",
      error: "Unauthorized",
    });
  }
  return next();
});
