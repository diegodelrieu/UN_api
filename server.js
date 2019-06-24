const express = require("express");
const upload = require("./upload");
const cors = require("cors");
const bodyParser = require("body-parser")
const path = require('path')
const server = express();
const createError = require("http-errors")
const logger = require('morgan');

let server = express(); 

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

server.use(cors());
server.use(logger('dev'));
server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

// var corsOptions = {
//   credentials: true,
//   origin: "*",
//   optionsSuccessStatus: 200
// };

// server.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// })


server.post("/upload", upload.upload);

server.use(function(req, res, next) {
  next(createError(404));
});

server.listen(8000, () => {
  console.log("Server started!");
});

module.exports = server