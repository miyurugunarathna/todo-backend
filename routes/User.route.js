import express from "express";
import { register, login } from "../controllers/User.controller.js";

//initialize express router
const userRouter = express.Router();

//routes
userRouter.post("/signup", register);
userRouter.post("/login", login);

//export router
export default userRouter;