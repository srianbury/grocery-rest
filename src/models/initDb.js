import models from ".";
import { encrypt } from "../common";

async function populateDb() {
  const user2 = new models.User({
    username: "Brian2",
    email: "bsunbury29+test@gmail.com"
  });

  const user2Password = new models.UserPassword({
    uid: user2._id,
    password: encrypt(process.env.TEST_PASSWORD_2)
  });

  const user2List = new models.List({
    uid: user2._id,
    list: []
  });

  const user1 = new models.User({
    username: "Brian",
    email: "bsunbury29@gmail.com"
  });

  const user1Password = new models.UserPassword({
    uid: user1._id,
    password: encrypt(process.env.TEST_PASSWORD_1)
  });

  const user1List = new models.List({
    uid: user1._id,
    list: [
      new models.ListItem({
        name: "Bread"
      }),
      new models.ListItem({
        name: "Cheese"
      })
    ]
  });

  await user2.save();
  await user2Password.save();
  await user2List.save();

  await user1.save();
  await user1Password.save();
  await user1List.save();
}

async function clearDb() {
  await Promise.all([
    models.User.deleteMany({}),
    models.UserPassword.deleteMany({}),
    models.List.deleteMany({}),
    models.List.collection.dropIndexes()
  ]);
}

async function initDb() {
  await clearDb();
  await populateDb();
}

export default initDb;
