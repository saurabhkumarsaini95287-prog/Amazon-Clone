const express = require("express");
let { userModelForm, userLogin,userProfile } = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");
const userRouter = express.Router();


userRouter.post('/signup',userModelForm);

userRouter.post('/login',userLogin);

userRouter.get("/profile", authMiddleware, userProfile);

module.exports = userRouter;