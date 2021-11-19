const express = require("express");
const cors = require("cors");

//init
const app = express();

//settings
app.set("port", process.env.PORT || 3000);

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use(require("./auth/auth.routes"));
app.use(require("./users/users.routes"));

module.exports = app;
