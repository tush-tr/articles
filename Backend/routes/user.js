const router = require("express").Router();
const UserController = require("../controllers/UserController");
const verifyToken = require("../middlewares/verifyToken.js");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.patch("/update-profile", verifyToken, UserController.updateProfile);
router.get("/profile/:userId", UserController.profile);
router.get("/published-articles/:userId", UserController.publishedArticles);

module.exports = router;