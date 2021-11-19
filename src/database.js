const mongoose = require("mongoose");

const MONGO_URL = `${process.env.URL}`;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("DATABASE IS CONNECTED"))
  .catch((err) => console.log(err));
