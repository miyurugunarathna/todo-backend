import "dotenv/config";
import express from "express";
import cors from "cors";
import todoRouter from "./routes/Todo.route.js";
import userRouter from "./routes/User.route.js";
import { connect } from "./utils/dbConnect.js";

//configure express
const app = express();
app.use(cors());
app.use(express.json());

//connect to mongodb
connect();

//routes

app.get("/", (req, res) => {
    res.send("Todo app backend API");
});

app.use("/api/todo", todoRouter);
app.use("/api", userRouter);

export default app;