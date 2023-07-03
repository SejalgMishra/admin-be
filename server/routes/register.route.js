const express = require("express");
const auth = require("../middleware/auth");

const RegisterController = require("../controller/register");

const router = express.Router();

router.get("/", RegisterController.getData);

router.post("/", RegisterController.addData);

router.post("/login", RegisterController.LoginData);

router.get("/dash", RegisterController.authUser);

module.exports = router;
