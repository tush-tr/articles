const app = require("express")();
const userRouter = require("./user");
const adminRouter = require("./admin");
const articleRouter = require("./article");
const ArticleImageUploadController = require("../controllers/ArticleImageUploadController");
const UserImageUploadController = require("../controllers/UserImageUploadController");
const UserController = require("../controllers/UserController");
const verifyToken = require("../middlewares/verifyToken.js");
const ArticleHeaderImageUploadController = require("../controllers/ArticleHeaderImageUploadController.js")

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/article", articleRouter);

// For EditorJs image upload
app.post("/article-image-upload", ArticleImageUploadController.saveImage);
app.post("/article-header-image-upload", verifyToken, ArticleHeaderImageUploadController.saveImage);
app.post("/user-image-upload", verifyToken, UserImageUploadController.saveImage);
app.post("/contact-message", UserController.contactMessage);

module.exports = app;