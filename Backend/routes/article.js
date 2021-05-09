const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken.js");
const ArticleController = require("../controllers/ArticleController");

router.post("/", verifyToken, ArticleController.save);
router.put("/edit", verifyToken, ArticleController.edit);
router.post("/like-unlike", verifyToken, ArticleController.likeUnlike);
router.post("/comment", verifyToken, ArticleController.comment);
router.post("/report", ArticleController.report);
router.get("/recent", ArticleController.getRecent);
router.get("/saved", verifyToken, ArticleController.saved);
router.get("/of-user", verifyToken, ArticleController.ofUser);
router.post("/bookmark", verifyToken, ArticleController.bookmark);
router.get("/:id", ArticleController.getOne);
router.delete("/:id", verifyToken, ArticleController.deleteOne);
module.exports = router;