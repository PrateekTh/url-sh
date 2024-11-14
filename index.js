const express = require("express")
const path = require("path")
const {connectMongoDB} = require("./connection")
const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")


const app = express();
const PORT = 8000;
const MONGO_DB_URI = "mongodb://127.0.0.1:27017/short-url";

app.use(express.json())
app.use(express.urlencoded({extended:false}))

connectMongoDB(MONGO_DB_URI)
    .catch((err) => console.log("Error connecting to Database:"))
    .then(console.log("Connected to Database!"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static("public"));

app.use("/url", urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.listen(PORT, ()=> console.log(`Server started at Port ${PORT}!`));