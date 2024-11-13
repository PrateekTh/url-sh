const express = require("express")
const {connectMongoDB} = require("./connection")
const urlRouter = require("./routes/url")

const app = express();
const PORT = 8000;
const MONGO_DB_URI = "mongodb://127.0.0.1:27017/short-url";

app.use(express.json())

connectMongoDB(MONGO_DB_URI)
    .catch((err) => console.log("Error connecting to Database:"))
    .then(console.log("Connected to Database!"))

app.use("/url", urlRouter)

app.listen(PORT, ()=> console.log(`Server started at Port ${PORT}!`));