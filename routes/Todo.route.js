import express from "express";
import { addTodo, getTodos, updateTodo, deleteTodo } from "../controllers/Todo.controller.js";
import { authenticate } from "../middleware/Auth.middleware.js";

//initialize express router
const todoRouter = express.Router();

//protected routes using middleware
todoRouter.post("/", authenticate, addTodo);
todoRouter.get("/", authenticate, getTodos);
todoRouter.put("/:id", authenticate, updateTodo);
todoRouter.delete("/:id", authenticate, deleteTodo);

//export router
export default todoRouter;