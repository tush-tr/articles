const app = require("express")();
const userRouter = require("./user");
const adminRouter = require("./admin");
const articleRouter = require("./article");
const ImageUploadController = require("../controllers/ImageUploadController");
const UserController = require("../controllers/UserController");

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/article", articleRouter);

// For EditorJs image upload
app.post("/image-upload", ImageUploadController.saveImage);
app.post("/contact-message", UserController.contactMessage);

module.exports = app;