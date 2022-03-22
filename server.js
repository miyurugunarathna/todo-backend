import app from "./app.js";

//port number
const PORT = process.env.PORT || 5000;

//listen to port
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});