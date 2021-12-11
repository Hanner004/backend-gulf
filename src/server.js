const express = require("express");
const cors = require("cors");

//swagger config
const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("swagger-jsdoc");
const swaggerSpec = require("./config/swagger.json");

//init
const app = express();

//settings
app.set("port", process.env.PORT || 3000);

//middlewares
app.use(express.json());
app.use(cors());

//swagger
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc(swaggerSpec)));

//routes
app.use("/api/auth", require("./modules/auth/auth.routes"));
app.use("/api/users", require("./modules/users/users.routes"));

module.exports = app;
