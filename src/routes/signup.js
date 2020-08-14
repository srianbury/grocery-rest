import { Router } from "express";
import { encrypt, signToken } from "../common";

const router = Router();

async function usernameAlreadyInDb(req, res, next) {
  const user = await req.context.models.User.findByUsername(req.body.username);
  if (user === null) {
    next();
  } else {
    return res.status(400).json({
      message: "Username is already taken."
    });
  }
}

async function emailAlreadyInDb(req, res, next) {
  const user = await req.context.models.User.findByEmail(req.body.email);
  if (user === null) {
    next();
  } else {
    return res.status(400).json({
      message: "There is already an account for this email."
    });
  }
}

router.post("/", usernameAlreadyInDb, emailAlreadyInDb, async (req, res) => {
  const newUser = new req.context.models.User({
    username: req.body.username,
    email: req.body.email
  });

  const newUserPassword = new req.context.models.UserPassword({
    uid: newUser._id,
    password: encrypt(req.body.password)
  });

  const newUserList = new req.context.models.List({
    uid: newUser._id,
    list: []
  });

  await newUser.save();
  await newUserPassword.save();
  await newUserList.save();

  const token = signToken(newUser);
  return res.status(200).json({
    user: newUser,
    token
  });
});

export default router;
