import mongoose from "mongoose";

const { Schema } = mongoose;

// User Schema
const UserSchema = new Schema({
    name: String,
    email: String,
    password: String
});

// User model
const User = mongoose.model("User", UserSchema);

// Export the model
export default User;