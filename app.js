const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.disable('etag');

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use(bodyParser.urlencoded({extended: false, limit:'50mb', parameterLimit: 1000000}));
app.use(bodyParser.json({limit:'50mb'}));

app.use("/api", require("./api"));

app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "client/build")));

// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname + "/client/build/index.html"))
// );

app.get("*", (req, res) => {
  res.sendFile(path.resolve("public", "index.html"));
});

app.use(require("./utils/errorHandler"));

module.exports = app;