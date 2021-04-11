const app = require("express")();
const userRouter = require("./user");
const articleRouter = require("./article");
const ImageUploadController = require("../controllers/ImageUploadController");

app.use("/user", userRouter);
app.use("/article", articleRouter);

// For EditorJs image upload
app.post("/imageUpload", ImageUploadController.saveImage);

module.exports = app;