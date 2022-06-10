require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/user/user.router");
const newsRouter = require("./api/news/news.router");

app.use(express.json());
app.use("/api/user/", userRouter);
app.use("/api/news/", newsRouter);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running on port : ", process.env.APP_PORT);
});
