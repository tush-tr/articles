const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken.js");
const ArticleController = require("../controllers/ArticleController");

// only to test if verifyToken middleware is working
router.post("/", verifyToken, ArticleController.saveArticle);

module.exports = router;