const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken.js");
const ArticleController = require("../controllers/ArticleController");

router.post("/", ArticleController.saveArticle);
router.post("/like", ArticleController.like);
router.post("/comment", ArticleController.comment);
router.post("/report", ArticleController.report);
router.get("/:id", ArticleController.getArticle);
module.exports = router;