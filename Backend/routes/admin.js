const router = require("express").Router();
const AdminController = require("../controllers/AdminController");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.post("/login", AdminController.login);
router.get("/dashboard", verifyAdmin, AdminController.dashboard);
router.get("/published-articles", verifyAdmin, AdminController.publishedArticles);
router.get("/to-be-verified-articles", verifyAdmin, AdminController.toBeVerifiedArticles);
router.post("/change-article-status", verifyAdmin, AdminController.changeArticleStatus);
router.post("/delete-article", verifyAdmin, AdminController.deleteArticle);
router.get("/contact-messages", verifyAdmin, AdminController.contactMessages);
router.get("/reports", verifyAdmin, AdminController.reports);

module.exports = router;