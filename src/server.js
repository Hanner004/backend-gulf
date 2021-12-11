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
app.use(require("./modules/auth/auth.routes"));
app.use(require("./modules/users/users.routes"));

module.exports = app;
