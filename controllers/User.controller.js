import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

// User registration
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exUser = await User.findOne({ email });
        if (exUser) {
            res.status(400).send("User already exists");
        } else {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(password, salt);
            const newUser = new User({ name, email, password: hash });
            const savedUser = await newUser.save();
            res.status(201).send(savedUser);
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

// User login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).send("User does not exist");
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).send("Incorrect password");
            } else {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                res.status(200).send({ token });
            }
        }
    } catch (err) {
        res.status(500).send(err);
    }
}