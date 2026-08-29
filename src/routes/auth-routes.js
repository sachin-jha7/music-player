const express = require("express");
const authControllers = require("../controllers/auth-controller");

const router = express.Router();

router.post("/login", authControllers.login, (req, res) => {
    res.redirect("/");
});
router.post("/signup", authControllers.signup, (req, res) => {
    res.redirect("/");
});
router.get("/logout", authControllers.logout, (req, res) => {
    res.redirect("/");
});


module.exports = router;