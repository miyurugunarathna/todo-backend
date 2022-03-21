import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRouter from "./routes/Todo.route.js";
import userRouter from "./routes/User.route.js";

//configure express
const app = express();
app.use(cors());
app.use(express.json());

//connect to mongodb
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => {
    console.log("connected to MongoDb");
});

//routes

app.get("/", (req, res) => {
    res.send("Todo app backend API");
});

app.use("/api/todo", todoRouter);
app.use("/api", userRouter);