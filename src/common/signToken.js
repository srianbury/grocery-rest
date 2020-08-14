import jwt from "jsonwebtoken";

function signToken(user) {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
}

export default signToken;
