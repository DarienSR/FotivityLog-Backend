require("dotenv").config({ path: "./config.env" });
var express = require("express") // import express
const cors = require("cors") // import cors
const path = require('path');
const cookieParser = require('cookie-parser');
const { logger } = require('./middleware/logger');
const errorHandlder = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions')
//DESTRUCTURE ENV VARIABLES WITH DEFAULT VALUES
const PORT = process.env.PORT || 5000;
var app = express()
app.use(logger);
app.use(cors(corsOptions));
app.use('/', express.static(path.join(__dirname, 'public')));
// Create Application Object
// GLOBAL MIDDLEWARE
app.use(express.json()); // parse json bodies
app.use(cookieParser());

const SessionRouter = require("./routes/Session");
const UserRouter = require("./routes/User");

app.use("/session", SessionRouter)
app.use("/user", UserRouter)

// APP LISTENER
app.use(errorHandlder);
app.listen(PORT, () => console.log("SERVER STATUS", `Listening on port ${PORT}`))

module.exports = app;