const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  signout,
} = require("../controllers/auth");
const { userSignupValidator, userErrorSend } = require("../validator/index");

router.post("/signup", userSignupValidator, userErrorSend, signup);
router.post("/signin", signin);
router.get("/signout", signout);


module.exports = router;
