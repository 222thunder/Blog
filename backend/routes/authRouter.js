const express = require("express");
const authController = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/login", authController.postLogin);
authRouter.post("/signup", authController.postSignup);
authRouter.post("/logout", authController.postLogout);
authRouter.get("/me", authController.getMe);   // check session / current user

module.exports = authRouter;
