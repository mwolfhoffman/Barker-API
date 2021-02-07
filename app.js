import express from "express";
import bodyParser from "body-parser";
import dao from "./repositories/dao";
import { authenticated, authMiddleware } from "./controllers/auth.controller";
import authRoutes from "./routes/auth.routes";
import feedRoutes from "./routes/feed.routes";
import profileRoutes from "./routes/profile.routes";
const session = require("express-session");
const cookieParser = require("cookie-parser");
import * as sqlite3 from "sqlite3";
import sqliteStoreFactory from "express-session-sqlite";
var cors = require("cors");

const port = 3000;
export const app = express();

app.listen(port, () =>
  console.log(`Barker API is listening on port ${port}!`)
);
app.use(cors());
app.use(bodyParser.json());
app.use(authMiddleware);
app.use(cookieParser());

app.use(session({secret: "session-secret"}));
const SqliteStore = sqliteStoreFactory(session);
app.use(
  session({
    store: new SqliteStore({
      driver: sqlite3.Database,
      path: process.env.DB_HOST,
      ttl: 604800000, // 1 week in miliseconds
    }),
  })
);

//  Script to setup sqlite DB in memory //
dao.setupDbForDev();
////////////////////////////////////

app.use("/api/users", authRoutes);
app.use("/api/feed", authenticated, feedRoutes);
app.use("/api/profile", authenticated, profileRoutes);
