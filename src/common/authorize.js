import jwt from "jsonwebtoken";
import { userInfo } from "os";

function authorize(req, res, next) {
  const bearerToken = req.headers.authorization;

  if (typeof bearerToken === "undefined") {
    return res.status(401).json({
      message: "No Bearer token found."
    });
  }

  jwt.verify(bearerToken, process.env.JWT_SECRET_KEY, (error, userInfo) => {
    if (error) {
      throw Error("Unhandle exception"); // token verfication failed for some reason
    } else {
      req.token = bearerToken; // not sure why this is needed
      req.userInfo = userInfo;
      next();
    }
  });
}

export default authorize;
