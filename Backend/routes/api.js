const app = require("express")();
const userRouter = require("./user");
const articleRouter = require("./article");

app.use("/user", userRouter);
app.use("/article", articleRouter);

module.exports = app;