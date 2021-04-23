const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken.js");
const ArticleController = require("../controllers/ArticleController");

router.post("/", verifyToken, ArticleController.save);
router.post("/like-unlike", verifyToken, ArticleController.likeUnlike);
router.post("/comment", verifyToken, ArticleController.comment);
router.post("/report", ArticleController.report);
router.get("/recent", ArticleController.getRecent);
router.get("/:id", ArticleController.getOne);
module.exports = router;