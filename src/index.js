import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { connectDb, initDb } from "./models";
import routes from "./routes";
import { useModels } from "./middleware";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(useModels);

app.use("/login", routes.login);
app.use("/signup", routes.signup);
app.use("/list", routes.list);

connectDb();
initDb();

app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`);
});
