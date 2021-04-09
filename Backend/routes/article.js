const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken.js");
const ArticleController = require("../controllers/ArticleController");

// only to test if verifyToken middleware is working
router.get("/", verifyToken, ArticleController.test);

module.exports = router;