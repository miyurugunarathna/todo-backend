import mongoose from "mongoose";

const { Schema } = mongoose;

// Todo Schema
const TodoSchema = new Schema({
    content: String,
    status: Boolean
});

// Todo model
const Todo = mongoose.model("Todo", TodoSchema);

// Export the model
export default Todo;