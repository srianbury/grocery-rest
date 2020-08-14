import { Router } from "express";
import jwt from "jsonwebtoken";
import { decrypt, signToken } from "../common";

const router = Router();
/*
  200: user info and token
  401: Username and password do not match
  404: Username does not exist
*/

async function confirmUserExists(req, res, next) {
  const user = await req.context.models.User.findByUsername(req.body.username);
  if (!user) {
    return res.status(400).json({
      message: "Username does not exist."
    });
  } else {
    req.context.user = user;
    next();
  }
}

async function verifyPasswordMatches(req, res, next) {
  const { password: givenPassword } = req.body;
  const { _id: uid } = req.context.user;

  const passwordInfo = await req.context.models.UserPassword.findByUid(uid); // set this to null to watch it break
  const { password: actualPassword } = await passwordInfo;

  if (givenPassword !== decrypt(actualPassword)) {
    return res.status(400).json({
      message: "Username and password do not match."
    });
  } else {
    next();
  }
}

router.post("/", confirmUserExists, verifyPasswordMatches, async (req, res) => {
  const { user } = req.context;
  const token = signToken(user);
  return res.status(200).json({ user, token });
});

export default router;
