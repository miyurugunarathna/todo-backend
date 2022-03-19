import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

// Middleware to verify token
export const authenticate = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id });
        if (!user) {
            res.status(401).send("Unauthorized");
        } else {
            req.user = user;
            next();
        }
    } catch (err) {
        res.status(401).send("Unauthorized");
    }
}