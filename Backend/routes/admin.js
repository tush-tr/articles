const router = require("express").Router();
const AdminController = require("../controllers/AdminController");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.post("/login", AdminController.login);
router.get("/dashboard", verifyAdmin, AdminController.dashboard);
router.get("/published-articles", verifyAdmin, AdminController.publishedArticles);
module.exports = router;