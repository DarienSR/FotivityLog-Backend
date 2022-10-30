require("dotenv").config({ path: "./config.env" });
var express = require("express") // import express

const cors = require("cors") // import cors

//DESTRUCTURE ENV VARIABLES WITH DEFAULT VALUES
const PORT = process.env.PORT || 5000;

// Create Application Object
var app = express()
// GLOBAL MIDDLEWARE
app.use(cors({origin: true, credentials: true}));
app.use(express.json()) // parse json bodies


const SessionRouter = require("./routes/Session");
const UserRouter = require("./routes/User");

app.use("/session", SessionRouter)
app.use("/user", UserRouter)

// APP LISTENER
app.listen(PORT, () => console.log("SERVER STATUS", `Listening on port ${PORT}`))